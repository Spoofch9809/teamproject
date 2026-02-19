import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const framePlacements = [
  { position: [0, 1.5, -3.8], rotation: [0, 0, 0] },
  { position: [-3.8, 1.5, 0], rotation: [0, Math.PI / 2, 0] },
  { position: [3.8, 1.5, 0], rotation: [0, -Math.PI / 2, 0] },
  { position: [0, 1.5, 3.8], rotation: [0, Math.PI, 0] }
];

const ThreeRoom = ({ frames, onFrameSelect }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f1115');

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 2.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.4, 0);

    // Room shell using inward-facing box faces.
    const roomGeometry = new THREE.BoxGeometry(8.5, 4.5, 8.5);
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: '#1b1f26',
      side: THREE.BackSide
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Simple floor plane for contrast.
    const floorGeometry = new THREE.PlaneGeometry(8.5, 8.5);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: '#13161b' });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    scene.add(floor);

    const ambient = new THREE.AmbientLight('#ffffff', 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight('#ffffff', 0.7);
    keyLight.position.set(4, 5, 2);
    scene.add(keyLight);

    const textureLoader = new THREE.TextureLoader();
    const frameMeshes = [];

    frames.slice(0, 4).forEach((frame, index) => {
      const placement = framePlacements[index];
      const geometry = new THREE.PlaneGeometry(2.4, 1.7);
      const material = new THREE.MeshStandardMaterial({
        color: '#f2f2f2',
        metalness: 0.1,
        roughness: 0.8
      });

      if (frame.image) {
        textureLoader.load(frame.image, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          material.map = texture;
          material.needsUpdate = true;
        });
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...placement.position);
      mesh.rotation.set(...placement.rotation);
      mesh.userData = frame;
      scene.add(mesh);
      frameMeshes.push(mesh);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(frameMeshes);

      if (intersections.length > 0) {
        const hit = intersections[0].object.userData;
        if (hit && onFrameSelect) {
          onFrameSelect(hit);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.setAnimationLoop(null);
      controls.dispose();

      frameMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (mesh.material.map) {
          mesh.material.map.dispose();
        }
        mesh.material.dispose();
      });

      floorGeometry.dispose();
      floorMaterial.dispose();
      roomGeometry.dispose();
      roomMaterial.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [frames, onFrameSelect]);

  return <div className="canvas-wrap" ref={containerRef} />;
};

export default ThreeRoom;

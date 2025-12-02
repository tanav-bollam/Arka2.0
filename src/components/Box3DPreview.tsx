'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BoxParams } from '@/lib/types';
import { computePanels } from '@/lib/dieline';

type Props = {
  params: BoxParams;
  foldProgress: number;
};

export const Box3DPreview: React.FC<Props> = ({ params, foldProgress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const panelMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    panelMeshesRef.current.forEach((mesh) => scene.remove(mesh));
    panelMeshesRef.current.clear();

    const panels = computePanels(params);
    const thickness = params.thickness || 0.05;

    const material = new THREE.MeshPhongMaterial({
      color: 0xd4b483,
      side: THREE.DoubleSide,
    });

    const S = 0.4;

    panels.forEach((panel) => {
      const geo = new THREE.BoxGeometry(panel.w * S, panel.h * S, thickness * S);
      const mesh = new THREE.Mesh(geo, material.clone());

      const cx = (panel.x + panel.w / 2) * S;
      const cy = (panel.y + panel.h / 2) * S;
      mesh.position.set(cx, cy, 0);

      mesh.userData.panel = panel;
      scene.add(mesh);
      panelMeshesRef.current.set(panel.id, mesh);
    });
  }, [params]);

  useEffect(() => {
    const S = 0.4;
    panelMeshesRef.current.forEach((mesh) => {
      const panel = mesh.userData.panel as any;
      if (!panel) return;

      const cx = (panel.x + panel.w / 2) * S;
      const cy = (panel.y + panel.h / 2) * S;
      mesh.position.set(cx, cy, 0);
      mesh.rotation.set(0, 0, 0);

      let angle = 0;
      if (panel.type !== 'bottom') {
        angle = panel.foldDirection * foldProgress * (Math.PI / 2);
      }

      const pivotX = panel.pivotX * S;
      const pivotY = (panel.pivotY + panel.h / 2) * S;

      mesh.position.sub(new THREE.Vector3(pivotX, pivotY, 0));
      if (panel.pivotAxis === 'x') {
        mesh.rotateX(angle);
      } else {
        mesh.rotateY(angle);
      }
      mesh.position.add(new THREE.Vector3(pivotX, pivotY, 0));
    });
  }, [foldProgress]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[320px] rounded-md border bg-white" />
  );
};

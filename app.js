const scene = new THREE.Scene();

scene.background = new THREE.Color(0x20232a);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x0000ff, 0.8, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  function (font) {
    const textGeometry = new THREE.TextGeometry("I love you guys", {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.08,
      bevelSegments: 10,
    });

    const textMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      emissive: 0x444444,
      shininess: 150,
      specular: 0xffffff,
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textGeometry.computeBoundingBox();
    const centerOffset =
      -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    textMesh.position.x = centerOffset;
    textMesh.position.y = -1;

    scene.add(textMesh);

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      let time = clock.getElapsedTime();
      textMesh.rotation.x = Math.sin(time) * 0.5;
      textMesh.rotation.y = Math.cos(time) * 0.5;
      textMesh.scale.x = 1 + Math.sin(time * 3) * 0.1;
      textMesh.scale.y = 1 + Math.cos(time * 3) * 0.1;

      camera.position.x = Math.sin(time * 0.5) * 5;
      camera.position.y = Math.cos(time * 0.5) * 2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
  }
);

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

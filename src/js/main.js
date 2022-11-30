var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    light = null;


function start() {
    initScene();
    sonido();
    animate();
}

function initScene(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("Celular")});
    

    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0x000000, 0.015, 100);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);
    // const gridHelper = new THREE.GridHelper(0,0,0x00000,0x00000);
    // scene.add(gridHelper)
    camera.position.set(10, 5, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(700,700);

    general = './src/models/'
    objpath = 'GalaxyS10.obj'
    mtlpath = 'GalaxyS10.mtl'

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(general );
    mtlLoader.setPath(general);
    mtlLoader.load(mtlpath, function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(general);
        objLoader.load(objpath, function (object) {
            modelLoad = object;
            scene.add(modelLoad);
            object.scale.set(20, 20, 20);
            object.position.y = 0;
            object.position.x = 0;
            object.position.z = 0;
        });
    });
}

function sonido(){
    var audio = new Audio('./src/audio/daFonk.mp3')
    audio.play();
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    audio.update();
}


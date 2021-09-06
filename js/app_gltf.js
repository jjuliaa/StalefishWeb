import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import {
  OrbitControls
} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import {
  GLTFLoader
} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

var canvas;

var scenes = [],
  renderer;

//to add new object: 1. increase scene count. 2. add file to files array 3. add name tag!
var scenecount = 6;
var printcam = new Boolean(false);

init();
animate();

//gltf files
var index;
var i;
var files = [scenecount];
//load gltfs
var loader;
var model;
//glb animator
var mixers = [];
var mixer;
var clock;
var light;

var loadedGeometry;

var loadMsg;

function init() {

  canvas = document.getElementById("c");

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  //renderer.setClearColor( 0xffffff, 1 );
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;

  clock = new THREE.Clock();
  //to load gltfs
  loader = new GLTFLoader();

  //mixer per scene, may not be needed for non-animated models
  mixers = [new THREE.AnimationMixer(), new THREE.AnimationMixer(), new THREE.AnimationMixer()];

  index = 0;
  i = 0;

  //order matters for naming tags!
  files = ['models/GreyScale_data_vole_65_7E_id2_L23.gltf', 'models/Cividis_data_vole_65_7E_id2_L23.gltf', 'models/Monochrome_bluehue_data_vole_65_7E_id2_L23.gltf', 'models/Jet_data_vole_65_7E_id2_L23.gltf','models/Plasma_data_vole_65_7E_id2_L23.gltf',  'models/Twilight_data_vole_65_7E_id2_L23.gltf'];

  var content = document.getElementById('content');

  for (var i = 0; i < scenecount; i++) {


    var scene = new THREE.Scene();
    //	scene1Format(i);
    // make a list item
    var element = document.createElement('div'); //div 0
    element.className = 'list-item';

    var sceneElement = document.createElement('div'); //div 1
    element.appendChild(sceneElement);

    if (i == 0) {
      var textinput2 = document.createElement('input'); //div 3
      textinput2.className = 'input';
      textinput2.placeholder = "GreyScale (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput2);
    }

    if (i == 1) {
      var textinput2 = document.createElement('input'); //div 3
      textinput2.className = 'input';
      textinput2.placeholder = "Cividis (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput2);
    }
    if (i == 2) {
      //add loading Messages
      var textinput = document.createElement('input'); //div 3
      textinput.className = 'input';
      textinput.placeholder = "Monochrome Blue (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput);

    }

    if (i == 3) {
      //add loading Messages
      var textinput = document.createElement('input'); //div 3
      textinput.className = 'input';
      textinput.placeholder = "Jet (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput);

    }

    if (i == 4) {
      //add loading Messages
      var textinput = document.createElement('input'); //div 3
      textinput.className = 'input';
      textinput.placeholder = "Plasma (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput);

    }

    if (i == 5) {
      //add loading Messages
      var textinput = document.createElement('input'); //div 3
      textinput.className = 'input';
      textinput.placeholder = "Twilight (Vole 65_7E_id2_sj_surface)";
      //add specific load message
      element.appendChild(textinput);

    }

    //var descriptionElement = document.createElement( 'div' ); // div 2
    //descriptionElement.innerText = 'Viz' + ( i + 1 );
    //if (i ==0)descriptionElement.innerText = ' "Earth Atmosphere Biomes" '
    //element.appendChild( descriptionElement );

    //add loading Messages
    loadMsg = document.createElement('div'); //div 3
    loadMsg.className = 'loadmsg';
    loadMsg.innerHTML = "Loading";

    //add specific load message
    element.appendChild(loadMsg);

    // the element that represents the area we want to render the scene
    scene.userData.element = sceneElement;
    content.appendChild(element);

    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.z = 5;
    scene.userData.camera = camera;

    camera.position.x = -1.02;
    camera.position.y = -2.21;
    camera.position.z = -5.90;

    //custom camera loading positions (this should get standardized by model sizes)
    /*if (index == 0) {
      camera.position.x = -1.02;
      camera.position.y = 7.38;
      camera.position.z = -0.35;
      //add controls to first sketch
    }
    */

    var controls = new OrbitControls(scene.userData.camera, scene.userData.element);
    controls.minDistance = 0.1;
    controls.maxDistance = 30;
    controls.enablePan = true;
    controls.enableZoom = true;
    scene.userData.controls = controls;

    //add glb
    model = new THREE.Mesh();
    loadNextFile(scene, loadMsg);


    //lights white organge
    light = new THREE.SpotLight(0x0000ff, 1); //0xffa95c,4);
    light.position.set(-50, 50, 50);
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    light.position.set(0, 10, 0);
    scene.add(light);

    var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x0000ff, 4);
    hemiLight.position.set(0, 0, 0);
    scene.add(hemiLight);

    var light1 = new THREE.AmbientLight(0x0000ff, 7); // soft white light
    light1.position.set(0, 15, 0);
    scene.add(light1);

    scenes.push(scene);
  }


}



function loadNextFile(scene, loadMsg) {

  if (index > files.length - 1) return;

  loader.load(files[index], (gltf) => {
      // called when the resource is loaded
      model = gltf.scene;
      scene.add(model);

      //materials and surface settings
      model.traverse(function(child) {
        if (child.isMesh) {

          //position set for direct exports out of Stalefish
          child.geometry.center();

          //use vertex colors
          var material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors
          });

          //to set material
          child.material = material;


          if (child.material) {
            child.material.side = THREE.DoubleSide; //makes the object look solid
          }

          //for geometry transformations
          loadedGeometry = child.geometry;
        }
      });


      //for animations
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });


      mixers.push(mixer);

    },
    (xhr) => {
      // called while loading is progressing

      LogFunction(`${( xhr.loaded / xhr.total * 100 )}% loaded, Hold for Loading`, loadMsg);
      //console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded`);
      if ((xhr.loaded / xhr.total * 100) == 100) {
        removeLog(loadMsg);
      }
      //
    },
    (error) => {
      // called when loading has errors
      LogFunction(`an error occured`, loadMsg);
      console.error('An error happened', error);
    },
  );

  index++;
}

//for loading manager messages
function LogFunction(text, loadMsg) {
  loadMsg.innerHTML = text;
}



function removeLog(loadMsg) {
  loadMsg.innerHTML = '';
}



function createNewMixer(model, gltf) {

  var mixer = new THREE.AnimationMixer(gltf.scene);


  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });


  return mixer;

}

function updateSize() {

				const width = canvas.clientWidth;
				const height = canvas.clientHeight;

				if ( canvas.width !== width || canvas.height !== height ) {

					renderer.setSize( width, height, false );

				}

			}

function animate() {

  render();
  //update mixers

  var delta = clock.getDelta();
  if (mixers.length > 1) {
    for (let i = 0, l = mixers.length; i < l; i++) {

      mixers[i].update(delta);

    }
  }

  requestAnimationFrame(animate);

}

function render() {

  updateSize();

  canvas.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0xFFFFFF);
  renderer.setScissorTest(false);
  renderer.clear();

  //renderer.setClearColor( 0xe0e0e0 );//gray?
  renderer.setClearColor(0xFFFFFF);
  renderer.setScissorTest(true);

  scenes.forEach(function(scene) {

    // so something moves
    //scene.children[0].rotation.y = Date.now() * 0.001;

    // get the element that is a place holder for where we want to
    // draw the scene
    var element = scene.userData.element;

    // get its position relative to the page's viewport
    var rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
      rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

      return; // it's off screen

    }

    // set the viewport
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var left = rect.left;
    var bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );

    //document.body.appendChild(renderer.domElement);
    //lighting related renderer settings
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;


    const camera = scene.userData.camera;

    //filter vertex colors to blue
    //for (var i = 0; i < model.geometry.attributes.positions.length; i++) {
    //model.geometry.attributes.color[i].setHSL( Math.random(), 0.5, 0.5 );
    //}
    //model.geometry.colorsNeedUpdate = true;

    //view camera position for custom setting
    if (printcam) {
    console.log("cam ", camera.position);
  }

    //dynamic lighting attempt
    light.position.set(
      camera.position.x + 10,
      camera.position.y + 10,
      camera.position.z + 10,
    );

    camera.aspect = width / height; //
    camera.updateProjectionMatrix(); //

    scene.userData.controls.update(); //may be off
    renderer.render(scene, camera);

  });

}

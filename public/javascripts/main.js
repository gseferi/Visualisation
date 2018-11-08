$(document).ready(()=>{

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  //How everything is going to render on the screen
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("black");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var axis = new THREE.AxesHelper(10);
  scene.add(axis);

  camera.position.set(-5, 5, 20);
  camera.lookAt(scene.position);

  var loader = new THREE.BufferGeometryLoader();
  loader.load(
      '/getmodel',
      // onLoad callback
      function (geometry) {
          $.ajax({
              type: "GET",
              url: '/getdata',
          }).then(
              function success(response){
                  var newdata=response.data;
                  console.log("response: " + newdata);

                  newdata.forEach(d=>{
                      console.log("d: " + d);
                      var array= new Float32Array(d)

                      var geom = geometry.attributes.position.setArray(array);
                      console.log("array: " + array);
                      var color ='#'+Math.floor(Math.random()*16777215).toString(16);
                      var material = new THREE.MeshBasicMaterial({color: color});
                      var object = new THREE.Mesh(geometry, material);
                      scene.add(object);
                    })
              });

      },

      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      // onError callback
      function (err) {
        console.log('An error happened');
      }
    );

  var animate = function() {
      requestAnimationFrame(animate);

      //cuboid.rotation.x += 0.01;
      //cube.rotation.y += 0.01;

      render();
  };

  var render = function() {
      renderer.render(scene, camera);
  };

  animate();
})

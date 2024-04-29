import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.getElementById("three-main");
let scene, renderer, camera;

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x808080); // 회색
	// field of view (시야각), aspect ratio(종횡비) , near , far
	// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer({canvas});
	// size
	renderer.setSize( window.innerWidth, window.innerHeight );
	// document.body.appendChild( renderer.domElement );

	camera = new THREE.OrthographicCamera(canvas.width/-2, canvas.width/2, canvas.height/-2, canvas.height/2, 1, 1000)

	const geometry = new THREE.BoxGeometry( 100, 200, 100 );
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); // 흰색
	const cube = new THREE.Mesh( geometry, material );

	scene.add(cube);

	camera.position.z = 10;

	// 화살표
	const right_line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const right_points = [];
	right_points.push( new THREE.Vector3( canvas.width/2-20, -10, 0 ) );
	right_points.push( new THREE.Vector3( canvas.width/2-10, 0, 0 ) );
	right_points.push( new THREE.Vector3( canvas.width/2-20, 10, 0 ) );
	const right_line_geometry = new THREE.BufferGeometry().setFromPoints( right_points );
	const right = new THREE.Line( right_line_geometry, right_line_material );

	const left_line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const left_points = [];
	left_points.push( new THREE.Vector3( canvas.width/-2+20, -10, 0 ) );
	left_points.push( new THREE.Vector3( canvas.width/-2+10, 0, 0 ) );
	left_points.push( new THREE.Vector3( canvas.width/-2+20, 10, 0 ) );
	const left_line_geometry = new THREE.BufferGeometry().setFromPoints( left_points );
	const left = new THREE.Line( left_line_geometry, left_line_material );

	scene.add(right);
	scene.add(left);

	// click event(화면 전환)
	const rayCaster = new THREE.Raycaster();
	let pointer = new THREE.Vector2();

	canvas.addEventListener("click", (e) => {
		e.preventDefault();
		pointer.x = ( e.clientX / canvas.width ) * 2 - 1;
		pointer.y = - ( e.clientY / canvas.height ) * 2 + 1;
		rayCaster.setFromCamera(pointer, camera);

		const points = rayCaster.intersectObjects([left, right]);
		points.forEach(point => {
			if (point.object == right) cube.rotation.y += 1;
		})
	})
}


function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

init();
animate();

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch {
    constructor(options) {
        this.container = options.domElement;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, .01, 100)
        this.camera.position.z = 10

        
        
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.container.appendChild(this.renderer.domElement)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    

        this.createMesh()
        this.resize()
        this.render()
    }

    createMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10)
        // this.material = new THREE.MeshBasicMaterial({color: 0xff0000})
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            uniforms: {
            },
            // vertexShader: vertex,
            fragmentShader: fragment
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }    

    resize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize( this.width, this.height );
        this.camera.aspect = this.width/this.height
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch({
    domElement: document.querySelector('#container')
})
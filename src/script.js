import * as THREE from 'three'
import './style.css'
import gsap from 'gsap'
import * as lil from 'lil-gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
/*** 
 Fonts
 ***/
const loadingManager = new THREE.LoadingManager()
const textureLoader  = new THREE.TextureLoader(loadingManager)
const matCapTexture = textureLoader.load('/textures/matcaps/1.png')
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            'Testing Testing',{
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matCapTexture})
        const text = new THREE.Mesh(textGeometry,textMaterial)
        scene.add(text)
    }
)
 
/*** 
 Fonts
 ***/

/*Debug*/ 
const gui = new lil.GUI()
/*Debug*/
const cursor ={
    x:0,
    y: 0
}
/*Cursor*/
window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientX / sizes.height - 0.5)


})
/*Cursor*/

// Canvas
const canvas = document.querySelector('canvas.webgl')

/*Sizes*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => 
{
    //update canvas
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    
    //update renderer
    renderer.setSize(sizes.width, sizes.height)

    console.log('window has been resized')
})



//looks for double-click and executes action as a result
/*Fullscreen*/
window.addEventListener('dblclick',() =>{

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
            console.log('go fullscreen')
        }
        else if(canvas.webkitRequestFullscreen)
        {
        canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
      
    }

    
    console.log('double click')
})

// Scene
const scene = new THREE.Scene()

//GROUPS
const groupMain = new THREE.Group()
groupMain.position.set(0,0,0)
const groupSub = new THREE.Group()
groupSub.position.set(0,0,0)
scene.add(groupMain)
scene.add(groupSub)
const norMat = new THREE.MeshNormalMaterial()
/////------SUB GROUP----////
/*Cube*/
var cubeControls = new function(){
    this.sclX = 1; 
    this.sclY = 1;
    this.sclZ = 1;
};



gui.add(cubeControls,'sclX',1,10)


    for(let i = 0; i < 100; i++){
    
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            norMat
         )
        
        cube.position.x = (Math.random() - 0.5) * 10
        cube.position.y = (Math.random() - 0.5) * 10
        cube.position.z = (Math.random() - 0.5) * 10
    
        cube.rotation.x = Math.random() * Math.PI
        cube.rotation.Y = Math.random() * Math.PI
    
        cube.scale.set(cubeControls.sclX, Math.random(), Math.random())
    
        groupMain.add(cube)
        gsap.to(cube.rotation,{duration: 6, delay: 0.3, x: (Math.random() - 0.3) * 10})
        gsap.to(cube.rotation,{duration: 6, delay: 0.3, y: 10})
        gsap.to(cube.rotation,{duration: 6, delay: 0.3, z: 10})

     }



/*Cube*/




/*Camera*/
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height,0.1,1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, 1 * aspectRatio, 1,-1,0.1,1000
// )
camera.position.z = 1
scene.add(camera)

//checking distance from object to camera//
camera.lookAt(groupMain.position)
/*Controls*/

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.update()


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


//Time
let time = Date.now()

//render//
function render(){
    loop()
}
//Animations
const loop = () =>
{
    /*ensures website moves at the right time regardless of device*/
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
   

    //Adding and placing cubes//
    



    //Adding and placing cubes//

    

    camera.lookAt(new THREE.Vector3(0,0,0))
    renderer.render(scene, camera)
    window.requestAnimationFrame(render)

}

loop()

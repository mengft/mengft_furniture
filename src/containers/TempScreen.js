import React, { Component } from 'react'
import * as THREE from 'three'
import 'three/examples/js/controls/TrackballControls.js'
var camera, scene, renderer, controls, loader
var geometry, material, mesh

class TempScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    /** function */
    this.animate = this.animate.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }

  componentDidMount () {
    this.initThree()
    console.log(THREE)
  }

  /** 初始化3D场景 */
  initThree () {
    // init 场景
    scene = new THREE.Scene()
    // loader = new THREE.OBJLoader()// 在init函数中，创建loader变量，用于导入模型
    // init 相机
    // var radius = mesh.geometry.boundingSphere.radius
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000)
    // camera.position.set(0.0, radius, radius * 3.5)
    camera.position.z = 5
    /** ********************************* 轨迹球控制 **********************************/
    //  鼠标左击旋转  右击平移 滚轮远近
    controls = new THREE.TrackballControls(camera)
    // 旋转速度
    controls.rotateSpeed = 1.0
    // 变焦速度
    controls.zoomSpeed = 1.2
    // 平移速度
    controls.panSpeed = 0.8
    // 是否不变焦
    controls.noZoom = false
    // 是否不平移
    controls.noPan = true
    // 可能是惯性 true没有惯性
    controls.staticMoving = false
    // 动态阻尼系数 就是灵敏度
    controls.dynamicDampingFactor = 0.3
    /** ******************************* 光源 ***************************************/
    // 新建一个环境光 就是正常物体都能照到的光
    var ambientLight = new THREE.AmbientLight(Math.random() * 0xffffff)
    // 把环境光加到场景中
    scene.add(ambientLight)
    // 再新建一个无线远的平行光，就是像太阳光一样的，
    var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff)
    // 把平行光放在y轴正方向上的无穷远处
    directionalLight.position.set(0, 1, 0)
    // 把平行光加到场景中
    scene.add(directionalLight)
    // 再建一个点光源 颜色 强度 照射距离
    var pointLight = new THREE.PointLight(0xff0000, 1, 500)
    // 设置点光源的位置
    pointLight.position.set(0, 0, -200)
    // 把点光源加入到场景中
    scene.add(pointLight)
    /** 渲染器 */
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    /** ****************************** 添加模型和监听 *************************************/
    this.animate()
    controls.addEventListener('change', this.renderScene)
    window.addEventListener('resize', this.onWindowResize, false)

    this.addCube()
    // this.addRoom()
  }

  /**
   * 添加盒子模型
   */
  addCube () {
    geometry = new THREE.BoxGeometry(1, 1, 1)
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
  }

  /**
   * 添加场景模型
   */
  addRoom () {
    loader.load('../images/mesh1.mb', function (obj) { // 第一个表示模型路径，第二个表示完成导入后的回调函数，一般我们需要在这个回调函数中将导入的模型添加到场景中
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide
        }
      })
      mesh = obj// 储存到全局变量中
      scene.add(obj)// 将导入的模型添加到场景中
    })
  }

  /**
   * 渲染动画
   */
  animate () {
    window.requestAnimationFrame(this.animate)
    // 更新控制器
    controls.update()
    this.renderScene()
  }

  /**
   * 渲染模型
   */
  renderScene () {
    renderer.render(scene, camera)
  }

  /**
   * scen auto适应界面size
   */
  onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render () {
    return (
      <div />
    )
  }
}

export default TempScreen

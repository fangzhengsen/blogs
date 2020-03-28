import Mock from 'mockjs'


import { user, sideMenu } from './data'



Mock.mock('/user', user)

Mock.mock('/sideMenu', sideMenu)
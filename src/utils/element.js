import Vue from 'vue'
import {
    Notification, Card, Dialog, Menu, Submenu, MenuItem, Input,
    InputNumber, Radio, Checkbox, Switch, Button, Table, TableColumn,
    Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem, Tree, Alert,
    Slider, Icon, Row, Col, Upload, Progress, Container, Header,
    Aside, Main, Footer, Image, MessageBox, Message, Dropdown, DropdownMenu,
    DropdownItem, MenuItemGroup, Loading
} from 'element-ui'

Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Image)

Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(Submenu)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)

Vue.use(Card)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Table)

Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$loading = function (define) {
    const loading = Loading.service({           // 声明一个loading对象
        lock: true,                             // 是否锁屏
        target: define && define.target || '.sub-main',   // 需要遮罩的区域
        text: define && define.text || '加载中',          // 加载动画的文字
        spinner: 'el-icon-loading',             // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色              
        body: false,
        customClass: 'mask'                     // 遮罩层新增类名
    })
    return loading;
}


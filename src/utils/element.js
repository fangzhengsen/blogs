import Vue from 'vue'
import {
    Notification, Card, Dialog, Menu, Submenu, MenuItem, Input,
    InputNumber, Radio, Checkbox, Switch, Button, Table, TableColumn,
    Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem, Tree, Alert,
    Slider, Icon, Row, Col, Upload, Progress, Container, Header,
    Aside, Main, Footer, Image, MessageBox, Message,
} from 'element-ui'
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


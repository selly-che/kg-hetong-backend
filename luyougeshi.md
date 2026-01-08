    <!-- 路由格式 -->
    使用方式,登录后后端返回数据格式,根据这个格式,把所有路径路由配置放在这里,读取的时候让后台判断,返回那些路径,与后端沟通好.
    <!-- 把路由配置放在这里 -->
    parentId: id;
    index: index;
    title:一级路由名称
    icon:图标 我用的是iconfont 的图标 根据自己情况替换就行了;
    type: group;
    children: [ //子级路由
    index:index;
    title:二级路由名称
    path:path;
    name:name;
    component:文件读取路径 读取pages 文件 路径// 看不明白的就把这里的路径和pages 下的路径对比一下就明白了
    menuType:menuType;
    meta:   路由原信息
    ] ;
    "nav": [
        {
            "parentId": "1",
            "index": "1",
            "title": "首页",
            "icon": "icon-shouye",
            "type": "group",
            "children": [
                {
                    "index": "1-1",
                    "title": "首页",
                    "name": "home",
                    "path": "/home",
                    "component": "shouYe/index",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "1-1",
                        "check": true
                    }
                }
            ]
        },
        {
            "parentId": "2",
            "index": "2",
            "title": "设备管理",
            "icon": "icon-shebei",
            "type": "group",
            "children": [
                {
                    "index": "2-1",
                    "title": "设备列表",
                    "name": "shebei",
                    "path": "/shebei",
                    "component": "shebei/shebei",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "2-1",
                        "check": true
                    }
                }
            ]
        },
        {
            "parentId": "3",
            "index": "3", 
            "title": "模块管理",
            "icon": "icon-mokuai",
            "type": "group",
            "children": [
                {
                    "index": "3-1",
                    "title": "模块列表",
                    "name": "mokuai",
                    "path": "/mokuai",
                    "component": "mokuai/Mokuai",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "3-1",
                        "check": true
                    }
                }
            ]
        },
        {
            "parentId": "4",
            "index": "4",
            "title": "标靶检测",
            "icon": "icon-mubiaobachang1",
            "type": "group",
            "children": [
                {
                    "index": "4-1",
                    "title": "报警列表",
                    "name": "jingIndex",
                    "path": "/jingIndex",
                    "component": "biaoba/index",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "4-1",
                        "check": true
                    }
                },
                {
                    "index": "4-2",
                    "title": "标靶检测",
                    "name": "biaoba",
                    "path": "/biaoba",
                    "component": "biaoba/biaoba",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "4-2",
                        "check": true
                    }
                },
                {
                    "index": "4-3",
                    "title": "标靶报警",
                    "name": "baojing",
                    "path": "/baojing",
                    "component": "biaoba/baojing",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "4-3",
                        "check": true
                    }
                },
                {
                    "index": "4-4",
                    "title": "报警等级",
                    "name": "dengji",
                    "path": "/dengji",
                    "component": "biaoba/dengji",
                    "menuType": 0,
                    "meta": {
                        "selectIndex": "4-4",
                        "check": true
                    }
                }
            ]
        }
    ]

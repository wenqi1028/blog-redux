export const target = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/'; //目标网站

// 标签
export const tags = 'Java,JavaScript,HTML,React,Vue,CSS,Redux,Webpack,历史,'
/**
 * 日期格式化 
 */
export function formatDate(str) {
    const date = new Date(str)
    const arr_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December']
    const month = date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '刚刚';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else {
        return date.getFullYear() + '-' + month > 9 ? month : ('0' + month) + '-' + day
    }
}

export function loadJs(src, callback, id){
    var head = document.getElementsByTagName("head")[0]||document.head||document.documentElement
    var script = document.createElement("script")
    script.setAttribute("id", id || "")
    script.setAttribute("type", "text/javascript")
    script.setAttribute("charset", "UTF-8")
    script.setAttribute("src" , src)
    if(typeof callback === "function") {
        if (window.attachEvent) {
            script.onreadystatechange = function() {
                var e = script.readyState
                if(e === "loaded" || e === "complete") {
                    script.onreadystatechange = null
                    callback()
                }
            }
        } else { script.onload = callback }
    }
    head.appendChild(script)
};

/**
 * 权限分配
 * @param str master, teacher, monitor, stdudent
 * @return obj 0: no-auth, 1: view, 2: create|update, 3: delete
 */
export function formatAuth(str) {
    switch (str) {
        case 'master': {
            return { post: 3 }
        }
        case 'teacher': {
            return { post: 2 }
        }
        case 'monitor': {
            return { post: 2 }
        }
        case 'student': {
            return { post: 1 }
        }
        default :
            return { post: 1 }
    }
}
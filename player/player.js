/*
1，写出基础 HTML ，曲库
2，播放/暂停按钮实现
    2.1设置对应的图标
3，设置歌曲时间
4，音量滑条
5，下一曲，通过切换 src
6，上一曲
7，非第一首时，自动播放下一首（还没做）
8，进度条（还没做）
9，歌曲名自动替换
10，点击菜单图标展开歌曲列表（不做了）
11，歌手图片，自动替换，旋转
*/



//辅助函数
var log = function() {
    console.log.apply(console, arguments)
}


//曲库
var songBook = {
    0:'music/故乡.mp3',
    1:'music/黄昏.mp3',
    2:'music/Im Yours.mp3',
    sl:3,
}


//播放/暂停
var toggle = function() {
    var a = $('#id-audio-player')
    var playButton = $('.button-play')
    playButton.on('click', function() {
        //根据播放状态
        if (a[0].paused) {
            a[0].play()
            //切换图标
            playButton.attr('src',"icon/暂停.png")
        }else {
            a[0].pause()
            playButton.attr('src',"icon/播放.png")
        }
    })
}







//获取歌曲总时间
var time = function() {
    $('#id-audio-player').on('canplay', function(event) {
        var song = event.target.duration
        var hour = String(parseInt(song/3600, 10))
        var minute = String(parseInt((song%3600)/60, 10))
        var second = String(parseInt(song %60, 10))
        if (hour.length == 1) {
            hour = '0' + hour
        }
        if (minute.length == 1) {
            minute = '0' + minute
        }
        if (second.length == 1) {
            second = '0' + second
        }
        var timeAll = hour + ":" + minute + ":" + second
        if (hour == '00') {
            var timeAll = minute + ":" + second
        }

        $('#duration').html(timeAll)
    })
}



//获取播放进度时间点
var progressTime = function() {
    var a = $('#id-audio-player')[0]
    var currentTime = a.currentTime
    var hour = String(parseInt(currentTime/3600, 10))
    var minute = String(parseInt((currentTime%3600)/60, 10))
    var second = String(parseInt(currentTime %60, 10))
    if (hour.length == 1) {
        hour = '0' + hour
    }
    if (minute.length == 1) {
        minute = '0' + minute
    }
    if (second.length == 1) {
        second = '0' + second
    }
    var timeAll = hour+":"+minute+":"+second
    if (hour == '00') {
        var timeAll = minute + ":" + second
    }
    $("#current").html(timeAll)
}



//音量滑条
var volume = function() {
    var value = $('#id-audio-player-volume')[0].value/100
    //log(value)
    $('#id-audio-player')[0].volume = value
}

//自定义音量滑条已填充的背景
var volumeBg = function() {
    var bg = $('.volume-bg')
    var vol = $('#id-audio-player-volume')
    var val = vol.val()
    var value = val/100*400
    bg.css('width',value)
}


//下一曲
var nextSongButton = function() {
    var playing = $('.playing')
    var id = playing[0].dataset.id
    //log('id is', id)
    var newId = (id + 1) % songBook.sl
    playing[0].dataset.id = newId
    playing.attr('src',songBook[newId])
    $('#id-audio-player')[0].load()
    //检查是否为播放状态，替换播放图标
    var a = $('#id-audio-player')
    var playButton = $('.button-play')
    if (a[0].paused) {
        playButton.attr('src',"icon/播放.png")
    }else {
        playButton.attr('src',"icon/暂停.png")
    }
}


//上一曲
var lastSongButton = function() {
    var playing = $('.playing')
    var id = playing[0].dataset.id
    //log('id is', id)
    var newId = ((id-1) + songBook.sl) % songBook.sl
    playing[0].dataset.id = newId
    playing.attr('src',songBook[newId])
    $('#id-audio-player')[0].load()
    //检查是否为播放状态，替换播放图标
    var a = $('#id-audio-player')
    var playButton = $('.button-play')
    if (a[0].paused) {
        playButton.attr('src',"icon/播放.png")
    }else {
        playButton.attr('src',"icon/暂停.png")
    }
}



//进度条(自定义进度条未做。。。。。。。。。。。。。。。。。。。。。。。。。)
//获取进度百分比
var getProgressBarValue = function() {
    var time = $('#id-audio-player')[0].duration
    //log('times is',times)
    var progressTime = $('#id-audio-player')[0].currentTime
    var now = Math.floor((progressTime / time) * 100)
    //log('now is',now)
    var t = `${now}`
    //log('t is',typeof(t))
    return t
}
//设置进度条
var setprogressBar = function() {
    var progress = $('.timeProgress')
    progress.attr('value', getProgressBarValue())
}



//歌曲名自动替换
var setMusicName = function() {
    //从 Src 截取歌曲名
    var playing = $('.playing')
    var src = playing.attr('src')
    for (var i = 0; i < src.length; i++) {
        if (src[i] == '/') {
            var slash = i + 1
        } else if (src[i] == '.') {
            var dot = i
        }
    }
    var name = src.slice(slash, dot)
    $('.music-name').text(name)
}




//点击菜单展开歌曲列表
var getMusicList = function() {
    var musicList = $('.music-list')
    //从曲库获取歌曲列表
    //曲库
    // var songBook = {
    //     0:'music/故乡.mp3',
    //     1:'music/黄昏.mp3',
    //     2:'music/Im Yours.mp3',
    //     sl:3,
    // }
    var keys = Object.keys(songBook)
    for (var i = 0; i < keys.length-1; i++) {
        var name = `<li>${songBook[i]}</li>`
        //'music/故乡.mp3'
        musicList.append(name)
    }
}



//设置了自动播放时的图标问题补丁函数
var autoPlayPatch = function() {
    var a = $('#id-audio-player')
    var playing = $('.playing')
    var autoPlay = a[0].autoplay
    if (autoPlay) {
        var playButton = $('.button-play')
        playButton.attr('src',"icon/暂停.png")
    }
}





var __mian = function() {
    // log('mian')
    toggle()
    //添加时间监听
    //进度条自动跟进
    $('#id-audio-player').on("timeupdate",setprogressBar)
    //音频加载完成时，获取总时长
    $('#id-audio-player').on("loadedmetadata",time)
    //替换显示为当前歌曲名
    $('#id-audio-player').on("loadedmetadata",setMusicName)
    //播放时，获取当前时间
    $('#id-audio-player').on("timeupdate",progressTime)
    //调节音量滑条时，改变音量
    $('#id-audio-player-volume').on('change',volume)
    //调节音量时改变滑条颜色
    $('#id-audio-player-volume').on('input propertychange',volumeBg)
    //下一首按钮
    $('.button-next').on('click', nextSongButton)
    //上一首按钮
    $('.button-last').on('click', lastSongButton)
    //播放完成后自动下一首
    $('#id-audio-player').on('ended', nextSongButton)
    //打开播放器后获取歌曲列表
    getMusicList()
    //设置自动播放时的图标问题
    $('#id-audio-player').on("loadedmetadata",autoPlayPatch)
}

__mian()

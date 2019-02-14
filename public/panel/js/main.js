import {Fetch,Fetch2} from './fetch';

let drawerHandler =  $('.content .navbar .row.handler');
$.each(drawerHandler, function (indexInArray, handler) { 
     $(handler).click(function (e) { 
        e.preventDefault();
        let drawer = $(this).next();
        let drawerRowsHeight = drawer.children('.row').length * 39;
        if($(drawer).hasClass('open')) {
            $(drawer).css('height', '0px');
            $(drawer).removeClass('open');
        } else {
            $(drawer).css('height', `${drawerRowsHeight}px`);
            $(drawer).addClass('open');
        } 
     });
});

// Uploaf Files
$('.file-btn').click(function (e) { 
    e.preventDefault();
    $(this).prev().trigger('click');
});

let imageBox = $('.image-box');
$.each(imageBox, function (indexInArray, box) { 
    let img = $(box).find('img.file');
    
    let garbage = $(box).find('div.garbage');
    let upload = $(box).find('div.upload');
    let uploaded = $(box).find('div.uploaded');
    let loading = $(box).find('div.loading');
    let text = $(box).parent().next().find('.text');
    let btn = $(box).parent().next().find('.file-btn');
    let filePath = $(box).parent().next().find('.path');
    let fileDestination = $(box).parent().next().find('.destination');
    let fileName = $(box).parent().next().find('.originalname');
    let file = $(box).parent().next().find('input[type="file"]');
    $(box).hover(function () {
            // over
            if($(img).attr('src') !== '') {
                $(garbage).addClass('show');
                if(!$(uploaded).hasClass('show')) {
                    $(upload).addClass('show');
                }
            }
        }, function () {
            // out
            $(garbage).removeClass('show');
            if(!$(uploaded).hasClass('show')) {
                $(upload).removeClass('show');
            }    
        }
    );
    if( $(img).hasClass('exist') ) {
        $(uploaded).addClass('show');
        $(garbage).addClass('hidden');
    }
    $(file).change(function (e) { 
        e.preventDefault();
        $(uploaded).removeClass('show');
        $(garbage).removeClass('hidden');
    });
    $(garbage).click(function (e) { 
        e.preventDefault();
        if($(uploaded).hasClass('show')) {
            // Remove Image from server with fetch2  
            const body = {
                filePath : $(filePath).text()
            }
            fetch('/admin/fileuploader' , {
                method : 'DELETE',
                body : JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                if(res.status == 'success') {
                    $(img).attr('src', '');
                    $(uploaded).removeClass('show');
                    $(btn).removeClass('hidden');
                    $(filePath).text('');
                    $(fileName).text('');
                    $(fileDestination).text('');
                } else {
                    $(text).text('There was a problem with the proccess');
                }
            }).catch(err => console.log(err));
        } else {
            $(img).attr('src', '');
        }
    });
    $(upload).click(function (e) { 
        e.preventDefault();
        $(loading).addClass('show');
        $(text).addClass('hidden');
        let file = $(box).parent().next().find('input[type="file"]');
        let formData = new FormData();
        formData.append('file', file[0].files[0]);
        formData.append('fileValue', file.val());
        fetch('/admin/fileuploader', {
            method : 'POST',
            body : formData
        }).then(res => {
            return res.json();
        }).then(res => {
            if(res.status == 'success') {
                $(loading).removeClass('show');
                $(upload).removeClass('show');
                $(uploaded).addClass('show');
                $(btn).addClass('hidden');
                $(filePath).text(res.data.filePath);
                $(fileDestination).text(res.data.fileDestination);
                $(fileName).text(res.data.fileName);
            } else if(res.status == 'error') {
                $(text).removeClass('hidden');
                $(loading).removeClass('show');
                let message = res.data;
                message.map(msg => {
                    $(text).text(msg);
                })
            } else {
                console.log(res);
            }
        }).catch(err => console.log(err));
    });
});

// Checkbox
let checkboxs = $('.form-box .form-group .checkbox .tick');
$.each(checkboxs, function (indexInArray, checkbox) { 
    $(checkbox).click(function (e) { 
        e.preventDefault();
        if( $(this).hasClass('ticked') ) {
            $(this).removeClass('ticked');
            $(this).prev().prop('checked', false);
        } else {
            $(this).addClass('ticked');
            $(this).prev().prop('checked', true);
        }
    });
    if( $(checkbox).hasClass('ticked') ) {
        $(this).prev().prop('checked', true);
    }
});
// Remember Login
let checkboxs2 = $('.form-box .form-group .checkbox2 .tick');
$.each(checkboxs2, function (indexInArray, checkbox) { 
    $(checkbox).click(function (e) { 
        e.preventDefault();
        if( $(this).hasClass('ticked') ) {
            $(this).removeClass('ticked');
            $(this).prev().val(false);
        } else {
            $(this).addClass('ticked');
            $(this).prev().val(true);
        }
    });
    if( $(checkbox).hasClass('ticked') ) {
        $(this).prev().val(true);
    }
});
// Drop Down Profile
$('.header-brand .topbar .profile img').click(function (e) { 
    e.preventDefault();
    let dropDown = $('.header-brand .topbar .dropdown-menu');
    if( $(dropDown).hasClass('open') ) {
        $(dropDown).removeClass('open');
    } else {
        $(dropDown).addClass('open');
    }
});
// Mobile-nav
let mobileNav = $('.mobile-nav .navbar');
$('.header-brand .mobile-nav-icon i.fa-bars').click(function (e) { 
    e.preventDefault();
    if( $(mobileNav).hasClass('open') ) {
        $(mobileNav).removeClass('open');
    } else {
        $(mobileNav).addClass('open');
    }
});
let topbarNav = $('.header-brand .topbar-mobile');
$('.header-brand .mobile-nav-icon .fa-ellipsis-h').click(function (e) { 
    e.preventDefault();
    if( $(topbarNav).hasClass('open') ) {
        $(topbarNav).removeClass('open');
    } else {
        $(topbarNav).addClass('open');
    }
});
// Close Mobile Nav
$('.content .navbar .close-nav i').click(function (e) { 
    e.preventDefault();
    if( $(mobileNav).hasClass('open') ) {
        $(mobileNav).removeClass('open');
    } else {
        $(mobileNav).addClass('open');
    }
});
$('.header-brand .topbar-mobile .close-nav i').click(function (e) { 
    e.preventDefault();
    if( $(topbarNav).hasClass('open') ) {
        $(topbarNav).removeClass('open');
    } else {
        $(topbarNav).addClass('open');
    }
});
// Clear Login & Register From
$('.Login input[name="email"]').val('');
$('.Login input[name="password"]').val('');
$('.Register input').val('');
$('.AddAdmin input').val('');
// Read Url
function readURL(input , boxNumber) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(`.image-box.box${boxNumber} img.file`).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// Read Urls
$(".Login input[name='wallpaper']").change(function () {
    readURL(this, "1");
});
$(".Register input[name='wallpaper']").change(function () {
    readURL(this, "2");
});
$(".UserProfile input[name='profile']").change(function () {
    readURL(this, "1");
});
$(".Testimonial input[name='image']").change(function () {
    readURL(this, "1");
});
$(".Experiences input[name='image']").change(function () {
    readURL(this, "1");
});
$(".Education input[name='image']").change(function () {
    readURL(this, "1");
});
$(".Home input[name='image']").change(function () {
    readURL(this, "1");
});
$(".About input[name='image']").change(function () {
    readURL(this, "1");
});
$(".AddAdmin input[name='profile']").change(function () {
    readURL(this, "1");
});
$(".UpdateAdmin input[name='profile']").change(function () {
    readURL(this, "1");
});
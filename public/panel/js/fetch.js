import izitoast from '../../plugin/izitoast/iziToast.min';
import swal from 'sweetalert';

const Fetch = (url,method,body) => {  
    fetch(url, {method,body})
    .then(res => {
      return res.json();
    }).then(res => {
      if(res.status == 'error') {
        if(res.data.type == 'ajax') {
          if (res.data.debug) {
            window.localStorage.setItem('message', res.data.msg);
            window.localStorage.setItem('statusCode', res.data.Stcode);
            window.localStorage.setItem('stack', res.data.stack);
            window.location = '/error/ajax';
          } else {
            window.location = '/500';
          }
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const Fetch2 = (url,method,body) => {
    fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(res => {
      console.log(res);
      if(res.status == 'error'){

        if(res.data.type == 'ajax') {
          if (res.data.debug) {
            window.localStorage.setItem('message', res.data.msg);
            window.localStorage.setItem('statusCode', res.data.Stcode);
            window.localStorage.setItem('stack', res.data.stack);
            window.location = '/error/ajax';
          } else {
            window.location = '/500';
          }
        }

        if(res.data.type == 'izitoast') {
          let messages = res.data.msg;
          if (typeof messages !== 'undefined') {
            messages.map(message => {
              izitoast(res.data.method, message);
            });
          }
        }

        if(res.data.type == 'swal') {
          let messages = res.data.title;
          if (typeof messages !== 'undefined') {
            swal({
              title: `${res.data.title}`,
              text: `${res.data.text}`,
              icon: `${res.data.icon}`,
              button: `${res.data.button}`
            }).then(value => {
              window.location = res.data.location;
            })
          }
        }

        if(res.data.type == 'field') {
          let message = res.data.msg;
          $('.error-box').removeClass('hidden');
          $(`${res.data.form} .error-box`).children().remove();
          message.map(msg => {
            $('.error-box').append(`<p>- ${msg}</p>`);
          })
        }

        if(res.data.type == 'redirect') {
          let messages = res.data.msg;
          if (typeof messages !== 'undefined') {
            messages.map(message => {
              izitoast(res.data.method, message);
            });
          }
          setTimeout(() => {
            window.location = res.data.href;
          }, 2000);
        }

        if(res.data.type == 'deleteObj') {
          switch (res.data.actionDel) {
            case 'row':
              rowDelete(res.data.objId);
              break;
            case 'box':
              boxDelete(res.data.objId);
              break;
            default:
              break;
          }
          swal({
            title: `${res.data.msg}`,
            icon: `${res.data.method}`,
            button: 'OK'
          });
        }

      }
    }).catch(err => {
      console.log(err);
    })
  }

  export {Fetch,Fetch2};
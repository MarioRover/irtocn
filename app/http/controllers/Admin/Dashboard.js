const Controller = require('../Controller');
const fs = require('fs');

module.exports = new class Dashboard extends Controller {
    async index(req , res , next) {
        try {
            let information = {};
            let unseen = (await this.unseenMessage()).length;
            let messages = await this.models.Messages.find();
            if(!this.isEmpty(messages)) {
                information = {
                    numOfMesg : messages.length
                }
            }

            res.render('panel/dashboard' , {
                layout : 'panel/master',
                title : 'Mario Rover Panel',
                activeRow : 'dashboard',
                manifest : this.Manifest,
                unseen,
                information
            })
        } catch (error) {
            // this.error('error in index method in DashboardCT' , 500 , next);
            console.log(error);
        }
    }
    async fileuploader(req , res , next) {
        try {
            let file = req.file;
            let validation = await this.validationData(req);
            if(!validation) {
                fs.unlinkSync(file.path);
                return res.json({
                    status : 'error',
                    data : req.flash('errors')
                })
            }
            if(await fs.existsSync(file.path)) {
                return res.json({
                    status : 'success',
                    data   : {
                        fileDestination : this.addressImage(file),
                        fileName : file.originalname,
                        filePath : file.path
                    }
                });
            } else {
                return res.json({
                    status : 'error',
                    data : ['Photo upload failed']
                });
            }
        } catch (error) {
            this.ajaxError('error in fileuploader method in DashboardCT' , 500 , error , res);
        }
    }
    async fileRemove(req , res , next) {
        try {
            if( await fs.existsSync(req.body.filePath) ) {
                await fs.unlinkSync(req.body.filePath);
                return res.json({
                    status : 'success'
                })
            } else {
                return res.json({
                    status : 'error'
                })
            }
        } catch (error) {
            this.ajaxError('error in fileRemove method in DashboardCT' , 500 , error , res);
        }
    }
    async ckeditorImage(req, res, next) {
        let image = req.file;
        res.json({
          'uploaded': 1,
          'filename': image.originalname,
          'url': `${image.destination}/${image.filename}`.substring(8)
        })
    }
    async about(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            res.render('panel/about' , {
                layout : 'panel/master',
                title : 'About Mario Rover Panel',
                activeRow : '',
                manifest : this.Manifest,
                unseen
            })
        } catch (error) {
            this.error('error in about method in DashboardCT' , 500 , next);
        }
    }
}
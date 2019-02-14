const Controller = require('../Controller');

module.exports = new class Messages extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let page = req.query.page || 1;
            let messages = await this.models.Messages.paginate({} , {
                page , 
                sort : {
                  createdAt: -1
                },
                limit : 15
            });
            res.render('panel/messages' , {
                layout : 'panel/master',
                title : 'Shams Messages',
                activeRow : 'messages',
                manifest : this.Manifest,
                messages,
                unseen
            });
        } catch (error) {
            this.error('error in index method in MessagesCT' , 500 , next);
        }
    }
    async message(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let result = await this.isMongoId(req.params.message);
            if(! result ) {
                return this.error('Error in validate mongoid in MessagesCT', 404, next);
            }
            await this.models.Messages.findById(req.params.message ,async(err , message) => {
                if (err) return this.error(err.msg, 404, next);
                if (!message) return this.error('Error in find mongoid in messageController.js', 404, next);
                message.seen = true;
                await message.save();
                res.render('panel/message' , {
                    layout : 'panel/master',
                    title : 'Shams Messages',
                    activeRow : 'messages',
                    manifest : this.Manifest,
                    message,
                    unseen
                });
            });
        } catch (error) {
            this.error('error in message method in MessagesCT' , 500 , next);
        }
    }
    async destroy(req , res , next) {
        try {
            let result = await this.isMongoId(req.body.message);
            if(! result ) {
                return console.log('MongoId is not valid');
            }
            await this.models.Messages.findById(req.body.message, (error, message) => {
                if (error) return this.ajaxError('Error in find message in destroy method at messageController.js', 500, error, res);
                if (!message) return this.ajaxError('not found message in destroy method at messageController.js', 404, error, res);
                message.remove();
                return this.deleteObj(['Message Deleted Successfully'], 'success', req.body.message , 'row' , res);
            });
        } catch (error) {
            this.ajaxError('error in destroy method in MessagesCT' , 500 , error , res);
        }
    }
}
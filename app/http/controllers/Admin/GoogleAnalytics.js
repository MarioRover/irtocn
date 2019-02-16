const Controller = require('../Controller');
const {google} = require('googleapis');

let oauth2Client = new google.auth.OAuth2(
    '531421653460-br45vgf3ppab7qiomiij7b0saqnmqgdi.apps.googleusercontent.com',
    'YzTTP8WxfMMszYgy7RPKxK_7',
    'http://irtocn.ir/admin/analytics'
);
const analyticsreporting = google.analyticsreporting({
    version: 'v4',
    auth: oauth2Client
});
const scopes = ['https://www.googleapis.com/auth/analytics'];

module.exports = new class User extends Controller {
    async oauth(req , res , next) {
        try {
            const url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes
            });
            res.redirect(url);
        } catch (error) {
            this.error('error in oauth method in GoogleAnalytics' , 500 , next);
        }
    }
    async analytics(req , res , next) {
        try {
            const {code} = req.query;
            const {tokens} = await oauth2Client.getToken(code);
            oauth2Client.credentials = tokens;
            const response = await analyticsreporting.reports.batchGet({
                requestBody: {
                  reportRequests: [
                    {
                      viewId: '65704806',
                      dateRanges: [
                        {
                          startDate: '2018-03-17',
                          endDate: '2018-03-24',
                        },
                        {
                          startDate: '14daysAgo',
                          endDate: '7daysAgo',
                        },
                      ],
                      metrics: [
                        {
                          expression: 'ga:189294424',
                        },
                      ],
                    },
                  ],
                },
            });
            res.json(response.data);
        } catch (error) {
            // this.error('error in analytics method in GoogleAnalytics' , 500 , next);
            console.log(error);
        }
    }
}
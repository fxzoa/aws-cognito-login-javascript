// ユーザープールの設定
const poolData = {
    UserPoolId : 'ap-northeast-1_mOWSvEmON',
    ClientId : '61qce9pokvpdqmgte3miu58bib'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
 
/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {
	
	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ap-northeast-1'; // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'ap-northeast-1:75ab7114-1cf9-4940-8b87-bb3cd8dd02ff'
	});
	
	// 「Activate」ボタン押下時
	$("#activationButton").click(function(event) {
	    activate();
	});
});
 
/**
 * アクティベーション処理
 */
var activate = function() {
    var username = $("#username").val();
    var activationKey = $("#activationKey").val();
    if (!username | !activationKey) return false;
	
    var userData = {
        Username : username,
        Pool : userPool
    };
	
	// アクティベーション処理
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(activationKey, true, function(err, result){
        if (err) {
            if (err.message != null) {
                $("div#message span").empty();
                $("div#message span").append(err.message);
            }
        } else {
			$(location).attr("href", "signin.html");
        }
    });
};

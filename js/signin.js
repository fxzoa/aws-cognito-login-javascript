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
		    
	// 「Sign In」ボタン押下時
	$("#signinButton").click(function(event) {
		signIn();
	});
	
});
 
/**
 * サインイン処理
 */
var signIn = function() {
    var username = $('#username').val();
    var password = $('#password').val();
    if (!username | !password) { 
    	$("#signin div#message span").empty();
    	$("#signin div#message span").append("All fields are required.");
    	return false; 
    }
    
    // 認証データの作成
    var authenticationData = {
        Username: username,
        Password: password
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // 認証処理
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var idToken = result.getIdToken().getJwtToken();          // IDトークン
            var accessToken = result.getAccessToken().getJwtToken();  // アクセストークン
            var refreshToken = result.getRefreshToken().getToken();   // 更新トークン
            
            console.log("idToken : " + idToken);
            console.log("accessToken : " + accessToken);
            console.log("refreshToken : " + refreshToken);
            
			$(location).attr("href", "menu.html");
        },
 
        onFailure: function(err) {
            console.log(err);
            $("div#message span").empty();
            $("div#message span").append(err.message);
        }
    });
};

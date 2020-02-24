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

	// 「Create Account」ボタン押下時
	$("#createAccount").click(function(event) {
	    signUp();
	});

});

/**
 * サインアップ処理。
 */
var signUp = function() {
	var username = $("#username").val();
	var password = $("#password").val();
	var email = $("#email").val();
    if (!username | !email | !password) return false;

	var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value: username}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
	attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:clientId",Value:$("#clientid").val()}));
	attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:au-id",Value:$("#auid").val()}));

    // サインアップ処理
    userPool.signUp(username, password, attributeList, null, function(err, result){
	    if (err) {
	    	alert(err);return;
	    } else {
			$(location).attr("href", "activation.html");
	    }
    });

}

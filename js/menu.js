// ユーザープールの設定
const poolData = {
    UserPoolId : 'ap-northeast-1_mOWSvEmON',
    ClientId : '61qce9pokvpdqmgte3miu58bib'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const cognitoUser = userPool.getCurrentUser();  // 現在のユーザー

/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {

    // Amazon Cognito 認証情報プロバイダーの初期化
    AWSCognito.config.region = 'ap-northeast-1'; // リージョン
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'ap-northeast-1:75ab7114-1cf9-4940-8b87-bb3cd8dd02ff'
    });

    // 現在のユーザーの属性情報を取得・表示
    getUserAttribute();

});

/**
 * 現在のユーザーの属性情報を取得・表示する
 */
var getUserAttribute = function() {
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.log(err);
                $(location).attr("href", "signin.html");
            } else {
                // ユーザの属性を取得
                cognitoUser.getUserAttributes(function(err, result) {
                    if (err) {
                        $(location).attr("href", "signin.html");
                    }

                    // 取得した属性情報を連想配列に格納
					var currentUserData = {};
                    for (i = 0; i < result.length; i++) {
                        currentUserData[result[i].getName()] = result[i].getValue();
                        console.log(result[i].getName()+" : "+result[i].getValue());
                    }
                    $("div#menu h1").text("ようこそ！" + currentUserData["name"] + "さん");

					$.ajax({
						contentType : "application/json",
						headers: { "Authorization": session.getIdToken().jwtToken },
						dataType : "json",
						type　: "GET",
						url　: "https://sm1hi0oin2.execute-api.ap-northeast-1.amazonaws.com/dev/auth",
						success : function(data) {
							$("div#content").text(JSON.stringify(data));
						},
						error : function(data) {
							console.log("Ajax get request error: ", data);
						}
					});
                });
            }
        });
    } else {
        $(location).attr("href", "signin.html");
    }

};

var myEmailApp = angular.module('emailApp', []);

myEmailApp.controller('EmailController', ['$scope', function($scope) {
  $scope.isPopupVisible = false;
  $scope.isComposePopupVisible = false;
  $scope.composeEmail = {};
  $scope.activeTab = "inbox";
  $scope.sentEmails = [];
  $scope.draftEmails = [];
    
    
    $scope.removeEmail = function(from) {
       var index = -1;
        var emailArray = eval( $scope.emails );
		for( var i = 0; i < emailArray.length; i++ ) {
			if( emailArray[i].from === from ) {
				index = i;
				break;
			}
		}
		
		$scope.emails.splice( index, 1 );		
	};
    
    $scope.saveDraft = function() {
        $scope.isComposePopupVisible = false;
        $scope.composeEmail.from = "me";
        $scope.composeEmail.date = new Date(); 
        $scope.draftEmails.push($scope.composeEmail);
    };
    
    
    
   $scope.sendEmail = function() {
        $scope.isComposePopupVisible = false;
        $scope.composeEmail.from = "me";
        $scope.composeEmail.date = new Date(); 
       $scope.sentEmails.push($scope.composeEmail);
    };
    
    $scope.showComposePopup = function() {
        $scope.composeEmail = {};
        $scope.isComposePopupVisible = true;
    };
    
    $scope.closeComposePopup = function() {
        $scope.isComposePopupVisible = false;
    };
    
    $scope.showPopup = function (email) {
    $scope.isPopupVisible = true;
    $scope.selectedEmail = email;
};
    $scope.closePopup = function () {
    $scope.isPopupVisible = false;
};
    $scope.forward = function() {
         // hide the view details popup
    $scope.isPopupVisible = false;
    // create an empty composeEmail object the compose email popup is bound to
    $scope.composeEmail = {};
    // copy the data from selectedEmail into composeEmail
    angular.copy($scope.selectedEmail, $scope.composeEmail);

    // edit the body to prefix it with a line and the original email information
    $scope.composeEmail.body =
        "\n-------------------------------\n"
        + "from: " + $scope.composeEmail.from + "\n"
        + "sent: " + $scope.composeEmail.date + "\n"
        + "to: " + $scope.composeEmail.to + "\n"
        + "subject: " + $scope.composeEmail.subject + "\n"
        + $scope.composeEmail.body;

    // prefix the subject with “RE:”
    $scope.composeEmail.subject = "FW: " + $scope.composeEmail.subject;
    // the email is going to the person who sent it to us
    // Empty as we do not know the sender
    $scope.composeEmail.to = "";
    // it’s coming from us
    $scope.composeEmail.from = "me";
    // show the compose email popup
    $scope.isComposePopupVisible = true;
};

$scope.reply = function() {
    // hide the view details popup
    $scope.isPopupVisible = false;
    // create an empty composeEmail object the compose email popup is bound to
    $scope.composeEmail = {};
    // copy the data from selectedEmail into composeEmail
    angular.copy($scope.selectedEmail, $scope.composeEmail);

    // edit the body to prefix it with a line and the original email information
    $scope.composeEmail.body =
        "\n-------------------------------\n"
        + "from: " + $scope.composeEmail.from + "\n"
        + "sent: " + $scope.composeEmail.date + "\n"
        + "to: " + $scope.composeEmail.to + "\n"
        + "subject: " + $scope.composeEmail.subject + "\n"
        + $scope.composeEmail.body;

    // prefix the subject with “RE:”
    $scope.composeEmail.subject = "RE: " + $scope.composeEmail.subject;
    // the email is going to the person who sent it to us
    // so populate the to with from
    $scope.composeEmail.to = $scope.composeEmail.from;
    // it’s coming from us
    $scope.composeEmail.from = "me";
    // show the compose email popup
    $scope.isComposePopupVisible = true;
};
    
  $scope.emails = [
    { from: 'Vaishali', to: 'me', subject: 'Weekly report status', date: 'Mar 7', body: 'Your Weekly status report is due today!' },
    { from: 'Ravisankar', to: 'me', subject: 'Monthly budget', date: 'Nov 11', body: 'Monthly budget for this month is Rs.20,000' },
    { from: 'Prashanth', to: 'me', subject: 'Latest UX trends', date: 'Jun 23', body: 'Follow my Quora link to find the latest trends in UX design' }
  ];
}]);


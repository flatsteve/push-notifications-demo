document.addEventListener("DOMContentLoaded", function () {

  var swWorkerRegistration;
  var swRegistrationStatus = document.querySelector('.swRegistrationStatus');
  var subscribeButton = document.querySelector('button');

  function handleSubscribed(subscription) {
    console.info('Subscription ID:', subscription.endpoint.split('send/')[1]);

    swRegistrationStatus.innerText = 'REGISTERED: ID ' + subscription.endpoint.split('send/')[1];
    subscribeButton.disabled = true;
  }

  function subscribeToPushMessages() {
    swWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true
    }).then(function (subscription) {
      handleSubscribed(subscription);
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js')

      // Service worker registered successfully
      .then(function (serviceWorkerRegistration) {
        console.info(serviceWorkerRegistration);
        swWorkerRegistration = serviceWorkerRegistration;

        // Check if there is an existing Push Manager Subscription
        swWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
          if (!subscription) {
            console.log('no subscription')
          } else {
            handleSubscribed(subscription);
          }
        });
      })

      .catch(function (error) {
        console.error(error);
      });
  } else {
    console.log('No service worker support')
  }

  subscribeButton.addEventListener('click', function () {
    subscribeToPushMessages();
  });
});

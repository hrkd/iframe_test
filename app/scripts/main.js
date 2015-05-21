'use strict';

console.log('\'Allo \'Allo!');

(function(win,doc){

$(function(){
  var $container = $('.container'),
    $modal       = $('.modal'),
    $modalBody   = $('.modal .modal-body'),
    target       = '.caption .btn',
    url = null,
    ajaxIndex = 1,
    modalTextIndex = 1,
    modalTextIndex = 1,
    itemFile = './item.html',
    iframeFile = './iframe.html',
    E = {
      click : 'click',
      showModal : 'show.bs.modal',
      hideModal : 'hide.bs.modal'
    };

  /*
   *  =======================================================
   *  以下が実際のサンプルコードです
   *  =======================================================
   * */

  //コンテナ内のaタグを監視
  $container.on(E.click, target, function (e) {
    var $that = $(e.target);
    url = iframeFile+'?q=' + $that.data('param');

    //aタグのデータ属性を渡して生成したiframeをappendする
    $modalBody.append(setIframeObject(url));
  });

  //iframeを生成して渡す
  var setIframeObject = function(url){
    var ifo = document.createElement('IFRAME');
    ifo.src = url;
    return ifo;
  };

  //hideイベントはモーダルが1画面中1つなので、onで監視するコストを避ける
  $modal.bind(E.hideModal, function() {
    //modalのhideイベントでiframeを破棄
    $modalBody.empty();
  });


  /*
   *  =======================================================
   *  ここからは負荷を確認するテストです。
   *  =======================================================
   * */

  var executeAjaxTest = true;
  var executeModalTest = false;

  //モーダルを連続的にshow hideしてメモリリークなどないかテスト
  var modalTest = function (){
    if(!executeModalTest)return;
    console.log("start modal text");
    $modal.trigger(E.showModal);

    var interval = setInterval(function() {
      console.log(modalTextIndex+"/100");
      if(modalTextIndex >= 100){
        clearInterval(interval);
        console.log("exit modal text");
      }

      if(modalTextIndex%2){
        $(target).eq(0).trigger(E.click);
      }else{
        $modal.modal('toggle');
      }
      modalTextIndex++;
    }, 500);
  }

  //Itemを100個追加
  var getItem = function (url){
    if(!executeAjaxTest)return;

    if(ajaxIndex > 100){
      modalTest();
      return;
    }

    var setting = {
      url:url,
      type:'GET',
      dataType:'html',
      success:function(data){
        console.log(ajaxIndex);
        ajaxIndex++;
        $container.append(data);
        getItem(url);
      }
    };
    $.ajax(setting);
  };

  getItem(itemFile);



  /*
  $(document).on('show.bs.cart.modal', '.cart.modal', function(event) {
    $(this).appendTo($('body'));
    var padding = 15;
    var margin = 1;
    var modal_height = $(window).height() - (padding + margin)*2;
    $('.cart.modal-content').height(modal_height);
    $('.cart.modal-body').height(modal_height);
  }).on('shown.bs.cart.modal', '.cart.modal.in', function(event) {
    setModalsAndBackdropsOrder();
  }).on('hidden.bs.cart.modal', '.cart.modal', function(event) {
    setModalsAndBackdropsOrder();
  });

  function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.cart.modal.in').each(function(index) {
      var $modal = $(this);
      modalZIndex++;
      $modal.css('zIndex', modalZIndex);
      $modal.next('.cart.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.cart.modal.in:visible:last').focus().next('.cart.modal-backdrop.in').removeClass('hidden');
  }

  $(document).on('show.bs.option.modal', '.option.modal', function(event) {
    $(this).appendTo($('body'));
  }).on('shown.bs.option.modal', '.option.modal.in', function(event) {
    setModalsAndBackdropsOrder();
  }).on('hidden.bs.option.modal', '.option.modal', function(event) {
    setModalsAndBackdropsOrder();
  });

  function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.option.modal.in').each(function(index) {
      var $modal = $(this);
      modalZIndex++;
      $modal.css('zIndex', modalZIndex);
      $modal.css('padding-right', 0);
      $modal.next('.option-modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.option.modal.in:visible:last').focus().next('.option.modal-backdrop.in').removeClass('hidden');
  }

  $(function(){
    $('.modal-body .row').bind('click',function(){
      parent.$('.modal').modal('hide');
    });
  });

  */

});

})(window,document);


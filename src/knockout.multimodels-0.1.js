/*
 * MultiModels plugin for Knockout JS
 * 
 * Author: Sergey Zwezdin (2012)
 * Contributors : Adrien Delorme (2013)
 *
 * https://github.com/sergun/Knockout-MultiModels
 *
 * License: MIT http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {

    var _viewModels = {};

    function checkViewModelName(name) {
        var nameExpression = /^[a-z]+[a-z0-9_]*$/i;

        if (!nameExpression.test(name))
            throw "Knockout JS MultiModels plugin: view model name is incorrect."
    }

    function attachViewModelToElement(viewModel, el) {
        // we don't rebind to alreay binded elements
        var isBinded = !! ko.dataFor(el);

        if ( !! (viewModel && viewModel.constructor && viewModel.call && viewModel.apply))
            viewModel = new viewModel(el);

        if (isBinded)
            console.log('Already binded to', ko.dataFor(el));

        isBinded = false;
        if ((viewModel != null) && (isBinded == false))
            ko.applyBindings(viewModel, el);
    };

    function refreshBindings(viewModelName) {
        /// <summary>Updates bindings for specific view model name.</summary>
        //[target='_blank']
        $("[data-model=" + viewModelName + "]").each(function() {
            var currentViewModel = _viewModels[viewModelName];
            attachViewModelToElement(currentViewModel, this);
        });
    };

    ko.refreshElBindings = function(el) {
        $.each(_viewModels, function(viewModelName, viewModel) {
            $(el).find("[data-model=" + viewModelName + "]").each(function() {
                attachViewModelToElement(viewModel, this);
            });
        });
    }

    ko.attach = function(viewModelName, viewModel) {
        /// <summary>Attaches view model.</summary>

        checkViewModelName(viewModelName);
        _viewModels[viewModelName] = viewModel;
        refreshBindings(viewModelName);
    };

    ko.detach = function(viewModelName) {
        /// <summary>Detaches view model.</summary>

        checkViewModelName(viewModelName);
        _viewModels[viewModelName] = null;
        refreshBindings(viewModelName);
    };

    ko.resolve = function(viewModelName) {
        /// <summary>Returns view model from list of view models.</summary>

        checkViewModelName(viewModelName);
        return _viewModels[viewModelName];
    };

})(jQuery);
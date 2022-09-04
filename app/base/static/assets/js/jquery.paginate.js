/**
 * Paginate - jQuery Plugin

 * Usage:
 *
 * <ul id="items">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *     <li>Item 3</li>
 *     <li>Item 4</li>
 *     <li>Item 5</li>
 *     <li>Item 6</li>
 * </ul>
 * <div id="items-pagination" style="display:none">
 *     <a id="items-previous" href="#">&laquo; Previous</a>
 *     <div id="blogs_list-pages" href="#"></div>
 *     <a id="items-next" href="#">Next &raquo;</a>
 * </div>
 *
 * <script type="text/javascript">
 * $('#items').paginate({itemsPerPage: 2});
 * </script>
 *
 */
(function($) {

$.fn.paginate = function(options) {

    var Paginator = function(self, options) {

        var defaults = {
            itemsPerPage: 10,
            selector: {
                next: self.selector+'-next',
                previous: self.selector+'-previous',
                pagination: self.selector+'-pagination',
                pageNums: self.selector+'-pages'
            },
            cssClassName: {
                disabled: 'disabled'
            }
        };
        var options = $.extend(defaults, options);
        var currentPage = 1;
        var numberOfPages = 1;
        var numberOfItems = 0;
        var list = "";

        var init = function() {
            numberOfItems = self.children().size();
            numberOfPages = Math.ceil(numberOfItems / options.itemsPerPage);

            for(var i = 1; i <= numberOfPages; i++){
              list += "<li class='page-item'><a href='#' onclick='clickfunc(this)' id=page-" + i + " class='page-link'>"+ i +"</a></li>";
              // console.log(list);
            }

            $('#blogs_list-pages').html(list);
            $("#blogs_list-pages a a:first").addClass("active");

            if (numberOfPages > 1) {
                $(options.selector.pageNums).show();
                $(options.selector.pagination).show();
                $(options.selector.previous).addClass(options.cssClassName.disabled);
            }

            self.children().hide();
            self.children().slice(0, options.itemsPerPage).show();

            $(options.selector.previous).click(function(e){
                e.preventDefault();
                previous();
            });
            $(options.selector.next).click(function(e){
                e.preventDefault();
                next();
            });
            // $(options.selector.pageNums).click(function(e){
            //     e.preventDefault();
            //     change();
            // });

            var t = 1;
            var pageNum = "#page-" + t;
            var disabled = options.cssClassName.disabled;
            $(pageNum).addClass(disabled);

            self.show();
        }

        var show = function(page) {
            currentPage = page;
            startPage = (currentPage - 1) * options.itemsPerPage;
            endPage = startPage + options.itemsPerPage;
            // console.log(options);

            self.children().hide().slice(startPage, endPage).show();

            var disabled = options.cssClassName.disabled;
            $(options.selector.pagination + ' a').removeClass(disabled);
            if (currentPage <= 1) {
                $(options.selector.previous).addClass(disabled);
            } else if (currentPage == numberOfPages) {
                $(options.selector.next).addClass(disabled);
            }

            var t = currentPage;
            var pageNum = "#page-" + t;
            var disabled = options.cssClassName.disabled;
            $(pageNum).addClass(disabled);
        };

        var next = function() {
            if (currentPage < numberOfPages){
                currentPage = parseInt(currentPage);
                show(currentPage + 1);
            }
        };

        var previous = function() {
            if (currentPage > 1) {
                show(currentPage - 1);
            }
        };

        clickfunc = function(link) {
          var t = link.innerText;
          // return console.log(t);
          var pageNum = "#page-" + t;
          // console.log(pageNum);
          var disabled = options.cssClassName.disabled;

          if (currentPage != t) {
            show(t);
          }
          $(pageNum).addClass(disabled);
        }

        init();
        return this;
    }

    return new Paginator(this, options);
};
})(jQuery);

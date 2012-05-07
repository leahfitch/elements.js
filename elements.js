/*
Create a new jquery node.

E(
    <elementname>,
    [<class names>]
    [children: a DOMElement, jQuery node, TextNode or an array of objects of these types]
)

Example:

E(
    'div',
    'someclass anotherclass',
    E('div',
        T('Some text')
    ).click(
        function () { alert('foo') }
    )
)

Can be expressed in html like so:

<div class="someclass anotherclass">
    <div onclick="function () { alert('foo') }">Some text</div>
</div>

A null passed where a child is expected will be ignored allowing
conditional structures in an element building chain like so:

var name = {
    first: 'Foo',
    last: null
}

E('div',
    T(name.first),
    name.last ? T(' '+name.last) : null
)
*/
function E()
{
    var e = $(document.createElement(arguments[0]))
    
    if (arguments.length > 1)
    {
        var args = Array.prototype.slice.call(arguments, 0)
        args.shift()
        
        if (typeof args[0] == 'string')
        {
            e.addClass(args.shift())
        }
        
        for (var i=0; i<args.length; i++)
        {
            if (args[i])
            {
                if (!args[i].jquery && typeof args[i].length != "undefined")
                {
                    args[i].forEach(function (_e)
                    {
                        e.append(_e)
                    })
                }
                else
                {
                    e.append(args[i])
                }
            }
        }
    }
    
    return e
}


/*
Create a jquery text node.
*/
function T(s)
{
    return $(document.createTextNode(s))
}


/*
A jQuery extension that appends a list of elements to a selection.

Example:

var items = ['a','b','c']

$('ul#foo').appendlist(
    items.map(function (i)
    {
        return E('li', T(i))
    })
)

Will turn this:

<ul id="foo"></ul>

into this:

<ul id="foo">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>
*/
$.fn.appendlist = function (elms)
{
    if (elms.length > 0)
    {
        var frag = document.createDocumentFragment()
        elms.forEach(function (e)
        {
            if (e)
            {
                if (e.jquery)
                {
                    e = e.get(0)
                }
                frag.appendChild(e)
            }
        })
        this.get(0).appendChild(frag)
    }
    return this
}


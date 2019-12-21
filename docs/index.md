# Time Tag Counter Bookmarklet for WorkFlowy

- Counts time using time tags: #2h #15m @2h @15m
- More powerful replacement for time tag feature in WFcount bookmarklet.
- Use either tag character, followed by digits, followed my h (hours) and m (minutes)
- Calculates time totals for All, Completed and Incomplete items.
- Generates different totals for each tag character.
- For example: you could use # tags to estimate time, and @ tags to record actual time.
- With no search, it gets all tags from the current zoom level.
- With search, it only calculates VISIBLE tags.

![Time Tag Counter](https://i.imgur.com/agqzwua.png)

## Installation: Drag this link to your bookmarks bar:

<a href="javascript:(function timeTagCounter_1_2(){function toastMsg(str,sec,err){WF.showMessage(str.bold(),err);setTimeout(()=&gt;WF.hideMessage(),(sec||2)*1e3)}function applyToEachItem(functionToApply,parent){functionToApply(parent);for(let child of parent.getChildren()){applyToEachItem(functionToApply,child)}}function findMatchingItems(itemPredicate,parent){const matches=[];function addIfMatch(item){if(itemPredicate(item)){matches.push(item)}}applyToEachItem(addIfMatch,parent);return matches}const itemHasTimeTag=item=&gt;WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).some(t=&gt;t.tag.match(/([@#])(\d+)([hm])$/i));const getTimeTags=item=&gt;WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).filter(t=&gt;t.tag.match(/([@#])(\d+)([hm])$/i)!==null);const matchHasTimeTag=item=&gt;item.data.search_result&amp;&amp;item.data.search_result.matches&amp;&amp;itemHasTimeTag(item);function getMinutes(str){const m=str.match(/(\d+)([hm])/i);return m[2]===&quot;h&quot;?parseInt(m[1])*60:parseInt(m[1])}function convertMinsToStr(mins){const hours=Math.floor(mins/60),netMins=mins-hours*60;return`${hours.toString().padStart(4,&quot; &quot;)}h ${netMins.toString().padStart(2,&quot; &quot;)}m`}function getTimeTagInfo(items){let hashComplete=0,hashInComplete=0,atComplete=0,atInComplete=0;items.forEach(item=&gt;{getTimeTags(item).forEach(t=&gt;{let tag=t.tag,addMins=getMinutes(tag);if(tag.startsWith(&quot;#&quot;)){item.isWithinCompleted()?hashComplete+=addMins:hashInComplete+=addMins}else{item.isWithinCompleted()?atComplete+=addMins:atInComplete+=addMins}})});const hashAll=hashComplete+hashInComplete,atAll=atComplete+atInComplete;if(atAll+hashAll===0)return null;hashTotals=hashAll&gt;0?`&lt;br&gt;#Total:   \t${convertMinsToStr(hashAll)}&lt;br&gt; Complete:\t${convertMinsToStr(hashComplete)}&lt;br&gt; Incomplete:\t${convertMinsToStr(hashInComplete)}`:&quot;&quot;;atTotals=atAll&gt;0?`&lt;br&gt;@Total:   \t${convertMinsToStr(atAll)}&lt;br&gt; Complete:\t${convertMinsToStr(atComplete)}&lt;br&gt; Incomplete:\t${convertMinsToStr(atInComplete)}`:&quot;&quot;;return`&lt;pre&gt;${hashTotals}&lt;br&gt;${atTotals}&lt;/pre&gt;`}const itemsToCount=WF.currentSearchQuery()?findMatchingItems(matchHasTimeTag,WF.currentItem()):findMatchingItems(itemHasTimeTag,WF.currentItem());const timeTagInfo=getTimeTagInfo(itemsToCount);if(!timeTagInfo)return void toastMsg(&quot;No Time Tags found.&quot;,2,true);const name=WF.currentItem().getNameInPlainText();const search=WF.currentSearchQuery()?`${WF.currentSearchQuery()} : `:&quot;&quot;;WF.showAlertDialog(timeTagInfo,search+name)})();">timeTagCounter</a>


## Links:
- [Source code](https://github.com/rawbytz/time-tag-counter/blob/master/timeTagCounter.js)
- [Tag Counter Bookmarklet is here](https://rawbytz.github.io/tag-counter/)
- [rawbytz Blog](https://rawbytz.wordpress.com)


<!-- 
LINKS REFERENCING THIS

@BLOGGER Redirect https://rawbytz.blogspot.com/p/time-tag-counter-for-workflowy.html

@BLOGGER Redirect https://rawbytz.blogspot.com/p/wfcount-bookmarklet.html

 -->

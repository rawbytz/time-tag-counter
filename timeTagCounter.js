(function timeTagCounter_1_2() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str.bold(), err);
    setTimeout(() => WF.hideMessage(), (sec || 2) * 1000);
  }
  function applyToEachItem(functionToApply, parent) {
    functionToApply(parent);
    for (let child of parent.getChildren()) {
      applyToEachItem(functionToApply, child);
    }
  }
  function findMatchingItems(itemPredicate, parent) {
    const matches = [];
    function addIfMatch(item) {
      if (itemPredicate(item)) {
        matches.push(item);
      }
    }
    applyToEachItem(addIfMatch, parent);
    return matches;
  }
  const itemHasTimeTag = item => WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).some(t => t.tag.match(/([@#])(\d+)([hm])$/i));
  const getTimeTags = item => WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).filter(t => t.tag.match(/([@#])(\d+)([hm])$/i) !== null);
  const matchHasTimeTag = item => item.data.search_result && item.data.search_result.matches && itemHasTimeTag(item);

  function getMinutes(str) {
    const m = str.match(/(\d+)([hm])/i);
    return m[2] === "h" ? parseInt(m[1]) * 60 : parseInt(m[1]);
  }
  function convertMinsToStr(mins) {
    const hours = Math.floor(mins / 60),
      netMins = mins - (hours * 60);
    return `${hours.toString().padStart(4, " ")}h ${netMins.toString().padStart(2, " ")}m`
  }
  function getTimeTagInfo(items) {
    let hashComplete = 0,
      hashInComplete = 0,
      atComplete = 0,
      atInComplete = 0;
    items.forEach((item) => {
      getTimeTags(item).forEach((t) => {
        let tag = t.tag,
          addMins = getMinutes(tag);
        if (tag.startsWith("#")) {
          item.isWithinCompleted() ? hashComplete += addMins : hashInComplete += addMins;
        } else {
          item.isWithinCompleted() ? atComplete += addMins : atInComplete += addMins;
        }
      })
    });
    const hashAll = hashComplete + hashInComplete,
      atAll = atComplete + atInComplete;
    if ((atAll + hashAll) === 0) return null;
    hashTotals = hashAll > 0 ? `<br>#Total:   \t${convertMinsToStr(hashAll)}<br> Complete:\t${convertMinsToStr(hashComplete)}<br> Incomplete:\t${convertMinsToStr(hashInComplete)}` : "";
    atTotals = atAll > 0 ? `<br>@Total:   \t${convertMinsToStr(atAll)}<br> Complete:\t${convertMinsToStr(atComplete)}<br> Incomplete:\t${convertMinsToStr(atInComplete)}` : "";
    return `<pre>${hashTotals}<br>${atTotals}</pre>`;
  }
  const itemsToCount = WF.currentSearchQuery() ? findMatchingItems(matchHasTimeTag, WF.currentItem()) : findMatchingItems(itemHasTimeTag, WF.currentItem());
  const timeTagInfo = getTimeTagInfo(itemsToCount);
  if (!timeTagInfo) return void toastMsg("No Time Tags found.", 2, true);
  const name = WF.currentItem().getNameInPlainText();
  const search = WF.currentSearchQuery() ? `${WF.currentSearchQuery()} : ` : "";
  WF.showAlertDialog(timeTagInfo, search + name);
})();
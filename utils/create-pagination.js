module.exports.createPagination = ({ itemsPerPage, maxPages }) => {
  const half = (maxPages - 1) / 2
  const smallerHalf = Math.floor(half)
  const largerHalf = Math.ceil(half)

  return function paginate({ currentPage=1, totalItems }) {
    const lastPage = Math.ceil(totalItems / itemsPerPage)

    if (currentPage > lastPage) {
      return {
        showFirst: false,
        showPrev: false,
        pages: [],
        showNext: false,
        showLast: false,
        lastPage
      }
    }

    let minPage

    if (currentPage - smallerHalf <= 1) {
      minPage = 1
    } else if (currentPage + largerHalf >= lastPage) {
      minPage = Math.max(1, lastPage - maxPages + 1)
    } else {
      minPage = currentPage - smallerHalf
    }

    const maxPage = Math.min(lastPage, minPage + maxPages - 1)

    let pages = []

    for (let page = minPage; page <= maxPage; page++) {
      pages.push(page)
    }

    const showFirst = (pages[0] > 1)
    const showPrev = (currentPage > 1)
    const showNext = (currentPage < lastPage)
    const showLast = (pages[pages.length - 1] < lastPage)

    return {
      showFirst,
      showPrev,
      currentPage,
      pages,
      showNext,
      showLast,
      lastPage
    }
  }
}

import { useCallback, useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (data: any[]) => {
  const observer = useRef<IntersectionObserver>()
  const [pageNumber, setPageNumber] = useState(1)

  const paginatedData = data.slice(0, pageNumber * 20)

  useEffect(() => {
    setPageNumber(1)
  }, [data])

  const observeIntersection = useCallback((node: any, hasMore: boolean) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  const lastElementRef = (node: any, index: number) => {
    return index + 1 === paginatedData.length
      ? observeIntersection(node, data.length !== paginatedData.length)
      : null
  }

  return { lastElementRef, pageNumber, paginatedData }
}

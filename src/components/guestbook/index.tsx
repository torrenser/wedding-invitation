import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { WeddingSection } from "@/components/section"
import { dayjs } from "../../const"
import offlineGuestBook from "./offlineGuestBook.json"
import { createClient } from "@supabase/supabase-js"
import { SERVER_URL, SERVER_KEY } from "../../env"

const supabase =
  SERVER_URL && SERVER_KEY ? createClient(SERVER_URL, SERVER_KEY) : null

const RULES = {
  name: {
    maxLength: 10,
  },
  content: {
    maxLength: 100,
  },
}

const PAGES_PER_BLOCK = 5
const POSTS_PER_PAGE = 5

type Comment = {
  id: number
  created_at: string
  name: string
  content: string
}

export const GuestBook = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [isWriteOpen, setIsWriteOpen] = useState(false)
  const [isAllOpen, setIsAllOpen] = useState(false)

  const loadComments = async () => {
    if (supabase) {
      try {
        const { data } = await supabase
          .from("comments")
          .select("*")
          .range(0, 2)
          .order("created_at", { ascending: false })
        if (data) {
          setComments(data)
        }
      } catch (error) {
        console.error("Error loading comments:", error)
      }
    } else {
      setComments(
        offlineGuestBook.slice(0, 3).map((comment) => ({
          ...comment,
          created_at: dayjs.unix(comment.created_at).toISOString(),
        })),
      )
    }
  }

  useEffect(() => {
    loadComments()
  }, [])

  return (
    <WeddingSection title="GUEST BOOK" subtitle="소중한 축하의 말씀" className="bg-white">
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-gray-50 border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">{comment.name}</span>
                <span className="text-xs text-gray-500">
                  {dayjs(comment.created_at).format("YYYY-MM-DD")}
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {comment.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-4">
        {supabase && (
          <Dialog open={isWriteOpen} onOpenChange={setIsWriteOpen}>
            <DialogTrigger>
              <Button variant="outline" className="w-full">
                방명록 작성하기
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>방명록 작성하기</DialogTitle>
                <DialogDescription>
                  신랑, 신부에게 축하의 마음을 전해주세요.
                </DialogDescription>
              </DialogHeader>
              <WriteGuestBookForm
                loadComments={loadComments}
                onComplete={() => setIsWriteOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={isAllOpen} onOpenChange={setIsAllOpen}>
          <DialogTrigger>
            <Button variant="outline" className="w-full">
              방명록 전체보기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>방명록 전체보기</DialogTitle>
            </DialogHeader>
            <AllGuestBookContent />
          </DialogContent>
        </Dialog>
      </div>
    </WeddingSection>
  )
}

const WriteGuestBookForm = ({
  loadComments,
  onComplete,
}: {
  loadComments: () => void
  onComplete: () => void
}) => {
  const inputRef = useRef({}) as React.RefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="grid gap-4 py-4"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = inputRef.current.name.value.trim()
          const content = inputRef.current.content.value.trim()

          if (!name) {
            alert("이름을 입력해주세요.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`이름을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (!content) {
            alert("내용을 입력해주세요.")
            return
          }
          if (content.length > RULES.content.maxLength) {
            alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (supabase) {
            const { error } = await supabase.from("comments").insert({
              name,
              content,
            })
            if (error) throw error
          }

          alert("방명록 작성이 완료되었습니다.")
          onComplete()
          loadComments()
        } catch {
          alert("방명록 작성에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          이름
        </label>
        <input
          id="name"
          disabled={loading}
          type="text"
          placeholder="이름을 입력해주세요."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={(ref) => {
            inputRef.current.name = ref as HTMLInputElement
          }}
          maxLength={RULES.name.maxLength}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="content" className="text-sm font-medium">
          내용
        </label>
        <textarea
          id="content"
          disabled={loading}
          placeholder="축하 메세지를 100자 이내로 입력해주세요."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={(ref) => {
            inputRef.current.content = ref as HTMLTextAreaElement
          }}
          maxLength={RULES.content.maxLength}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" disabled={loading}>
          저장하기
        </Button>
        <Button type="button" variant="outline" onClick={onComplete}>
          닫기
        </Button>
      </div>
    </form>
  )
}

const AllGuestBookContent = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const loadPage = async (page: number) => {
    setCurrentPage(page)
    if (supabase) {
      try {
        const from = page * POSTS_PER_PAGE
        const to = from + POSTS_PER_PAGE - 1
        const { data, count } = await supabase
          .from("comments")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("created_at", { ascending: false })

        if (data) {
          setComments(data)
          setTotalPages(Math.ceil((count || 0) / POSTS_PER_PAGE))
          if ((count || 0) < from) {
            setCurrentPage(Math.ceil((count || 0) / POSTS_PER_PAGE) - 1)
          }
        }
      } catch (error) {
        console.error("Error loading comments:", error)
      }
    } else {
      setCurrentPage(page)

      setComments(
        offlineGuestBook
          .slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE)
          .map((c) => ({
            ...c,
            created_at: dayjs.unix(c.created_at).toISOString(),
          })),
      )
      setTotalPages(Math.ceil(offlineGuestBook.length / POSTS_PER_PAGE))
    }
  }

  useEffect(() => {
    loadPage(0)
  }, [])

  const pages = useMemo(() => {
    const start = Math.floor(currentPage / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
    const end = Math.min(start + PAGES_PER_BLOCK, totalPages)

    return Array.from({ length: end - start }).map((_, index) => index + start)
  }, [currentPage, totalPages])

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="bg-gray-50 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm">{comment.name}</span>
              <span className="text-xs text-gray-500">
                {dayjs(comment.created_at).format("YYYY-MM-DD")}
              </span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {comment.content}
            </p>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={pages[0] <= 0}
          onClick={() => loadPage(pages[0] - 1)}
        >
          이전
        </Button>
        
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => {
              if (page === currentPage) return
              loadPage(page)
            }}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          disabled={pages[pages.length - 1] >= totalPages - 1}
          onClick={() => loadPage(pages[pages.length - 1] + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  )
} 
import { getBlogById } from "@/api/blog";
import { BlogType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import "./index.scss";

interface BlogPageState {
  blog: BlogType | null,
  isLoading: boolean,
  error: unknown,
}

const BlogPage = () => {
  const params = useParams();
  const id = params.id || "";
  const [ data, setData ] = useState<BlogPageState>({
    blog: null,
    isLoading: false,
    error: null
  });
  const date = new Date(String(data.blog?.date)).toDateString();
  useEffect(() => {
    const getData = async () => {
      try {
        setData(state => ({ ...state, isLoading: true }));
        const blog = await getBlogById(id);
        setData(state => ({ ...state, blog, isLoading: false }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getData();
  }, [ id ]);
  return (
    <>
    {
      data.isLoading ?
      <Preloader /> :
      data.error ?
      <ErrorPage /> :
      <div className="page blog-page">
        <div className="container py-2">
          <div className="blog-content w-md-75 w-xl-50">
            <h2 className="logo-font">{data.blog?.title}</h2>
            <p className="text-secondary mt-1 pb-2 mb-2 blog-header">{date} By Alexandria</p>
            <img src={data.blog?.cover} alt="" />
            <ReactMarkdown children={data.blog?.content}/>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default BlogPage;
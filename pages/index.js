import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, BackTop } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/aplUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import '../public/style/pages/index.css'

const Home = (list) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    } 
  })
  useEffect(()=>{
    var aTagArr = [].slice.apply(document.getElementsByTagName("a"));

    aTagArr.forEach(function (e, i) {
      e.href.indexOf("_blank") > -1 ? e.target = "_blank" : null;
    });
  })
  const [mylist, setMylist] = useState(list.data)
  return (
    <>
      <Head>
        <title>首页|撖腾的博客</title>
        <link rel="shortcut icon" href="/favico/html.ico" />
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        <meta name="keywords" content="撖腾，博客，hunt，汉腾, 韩腾，react，nextjs，nes.css, antd, vue, threejs, coder"></meta>
        <meta name="description" content="XX千万程序员观看，XX网千万程序员观看，XX网千万程序员观看，博客，XX博客"></meta>
      </Head>
      <Header />
      
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={22} sm={22} md={22} lg={20} xl={14} xxl={14} style={{ border: 'none'}}>
          <List
            className="nes-container with-title"
            header={<h6 className="hunt-home-list-header">article</h6>}
            itemLayout="vertical"
            split="false"
            dataSource={mylist}
            renderItem={(item, index) => (
              <List.Item className="hunt-home-list-item">
                <div className={index%2 === 0 ? "nes-container is-dark" : "nes-container"}>
                  <div className="hunt-home-list-title"><Link href={{pathname: '/detailed', query:{id:item.id}}}><a>{ item.title }</a></Link></div>
                  <div className="hunt-home-list-icon">
                    <span><Icon type="calendar"/>{ ' ' + new Date(item.addTime * 1000).toLocaleDateString().replace(/\//g, "-") }</span>
                    <span><Icon type="folder"/>{ ' ' + item.typeName}</span>
                    <span><Icon type="fire"/> {' ' + item.view_count}</span>
                  </div>
                  <div className="hunt-home-list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce)}}></div>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={0} lg={0} xl={8} xxl={6} style={{ border: 'none'}}>
          <Author />
        </Col>
      </Row>
      <Footer />
      <BackTop>
        <button type="button" className="nes-btn is-error comm-scroll-btn active"><span>&lt;</span></button>
      </BackTop>
    </>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home



import gql from 'graphql-tag'

const tagParams = `
    text,
    internalTag
`
const showParams = `
    id,
    title,
    slug,
    description,
    thumbnailURL,
    tags { ${tagParams} }
`
const videoParams = `
    id,
    title,
    description,
    duration, 
    thumbnailURL,
    url,
    shareURL,
    publishedAt,
    disableAds,
    tags { ${ tagParams } },
    show { ${ showParams } }
`

export const getHomePageQuery = () => {
    return (offset = 0, limit = 100) => { 
        return gql`
            query HomepageWeb{
                homepageWeb(offset:${ offset },limit:${ limit }){
                    ... on Video{
                        ${ videoParams }
                    }
                }
            }
        `
    }
}
export const getShowQueryById = id => {
    return (offset = 0, limit = 100) => {
        return gql`
            {
                items(showId: "${ id }", offset:${ offset },limit:${ limit }) {
                    ... on Video {
                        ${ videoParams }
                    }
                }
            }
        `
    }
}

export const getShowQueryBySlug = slug => {
    return gql`
        {
            show(slug: "${ slug }") {
                ${ showParams },
                items {
                    ... on Video {
                        ${ videoParams }
                    }
                }
            }
        }
    `
    
}
export const getMenuShowQuery = () => {
    return  gql`
        {
            shows {
                ${ showParams }
            }
        }
    `
}

export const getVideo = (id) => {
    return gql`
        {
            item(id: "${id}") {
                ... on Video {
                    ${ videoParams }
                }
            }
        }
    `
}
export const getWatchQuery = (videoId) => {
    return (offset = 0, limit = 100) => { 
        return gql`
            query Watch{
                homepage(offset:${ offset },limit:${ limit }){
                    ... on Video{
                        ${ videoParams }
                    }
                }, 
                item(id: "${videoId}") {
                    ... on Video {
                        ${ videoParams }
                    }
                }
            }
        `
    }
}
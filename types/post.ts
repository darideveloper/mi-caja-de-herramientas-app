// Define the post data type
export type PostLinkType = {
    id: number;
    icon: string;
    url: string;
};

export type PostGroupType = {
    name: string;
};

export type PostCategoryType = {
    name: string;
};


export type PostDataType = {
    id: number;
    duration: number;
    links: PostLinkType[];
    group: PostGroupType;
    category: PostCategoryType;
    title: string;
    text: string;
    image: string;
    audio_link: string;
    video_link: string;
}

export type PostSummaryType = {
    id: number;
    title: string;
    post_type: 'video' | 'social' | 'audio';
}
app.component('articles-group', {
    template:
    /*html*/
        `
    <div id="articles-group">
        <h1 id="group-title">{{groupTitle}}</h1>
        <div class="single-article" v-for="article in activeArticles" :key="article.id">
            <div class="article-top-container">
                <div class="article-image-container">
                    <img class="article-image" :src=article.image>
                </div>
                <div class="article-text-container">
                    <p class="article-title">{{article.title}}</p>
                    <div class="article-details">
                        <p class="article-type">{{article.type}}</p>
                        <p class="article-author_date">Author: {{article.author}} / {{article.date}}</p>
                    </div>
                    <div class="article-position">{{article.position}}</div>
                    <p class="article-abstract">Abstract: {{article.abstract}}</p>
                </div>
            </div>
            <div class="article-bottom-container">
                <div class="article-keywords-container">
                    <div class="article-keyword" v-for="keyword in article.keywords">{{keyword}}</div>
                </div>
                <div class="article-icons-container">
                    <div class="article-icon-container">
                        <img class="article-icon-img" src="./assets/main-panel/article-icons/cite.svg">
                        <p class="article-icon-text">{{article.cite}}</p>
                    </div>
                    <div class="article-icon-container">
                        <img class="article-icon-img" src="./assets/main-panel/article-icons/comment.svg">
                        <p class="article-icon-text">{{article.comment}}</p>
                    </div>
                    <div class="article-icon-container">
                        <img class="article-icon-img" src="./assets/main-panel/article-icons/trend.svg">
                        <p class="article-icon-text">{{article.trend}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            groupIndex: 0,
            groupTitles: ['All Articles', 'Read Later', 'Knowledge Graph', 'Data Vis'],
            // group2: Knowledge Graph
            // group3: Data Vis
            // group4: Others
            articles: [{
                    id: 0,
                    group: 4,
                    readLater: false,
                    type: "Journal Article",
                    author: "Andy Extance",
                    date: "October 2019",
                    position: "Nature-VOL 56-Toolbox",
                    title: 'How AI Technology can tame the scientific literature',
                    abstract: 'As artificially intelligent tools for literature and data exploration evolve, developers seek to automate how hypotheses are generated and validated.When computer scientist Christian Berger’s team sought to get its project about self-driving vehicle algorithms on the road, it faced a daunting obstacle. The scientists, at the University of Gothenburg in Sweden, found an overwhelming number of papers on the topic — more than 10,000 — in a systematic literature review. Investigating them properly would have taken a year, Berger says.',
                    image: './assets/main-panel/article-images/article1.png',
                    keywords: ['AI-based', 'Nature Language Processing', 'Knowledge Graph'],
                    cite: 2,
                    comment: 15,
                    trend: 50
                },
                {
                    id: 1,
                    group: 3,
                    readLater: true,
                    type: "Journal Article",
                    author: "Marco Cavallo",
                    date: "January 2019",
                    position: "IEEE Transactions on Visualization and Computer Graphics",
                    title: 'Clustrophile 2: Guided Visual Clustering Analysis',
                    abstract: "Data clustering is a common unsupervised learning method frequently used in exploratory data analysis. However, identifying relevant structures in unlabeled, high-dimensional data is nontrivial, requiring iterative experimentation with clustering parameters as well as data features and instances. The number of possible clusterings for a typical dataset is vast, and navigating in this vast space is also challenging. The absence of ground-truth labels makes it impossible to define an optimal solution, thus requiring user judgment to establish what can be considered a satisfiable clustering result. Data scientists need adequate interactive tools to effectively explore and navigate the large clustering space so as to improve the effectiveness of exploratory clustering analysis. We introduce Clustrophile 2, a new interactive tool for guided clustering analysis. Clustrophile 2 guides users in clustering-based exploratory analysis, adapts user feedback to improve user guidance, facilitates the interpretation of clusters, and helps quickly reason about differences between clusterings. To this end, Clustrophile 2 contributes a novel feature, the Clustering Tour, to help users choose clustering parameters and assess the quality of different clustering results in relation to current analysis goals and user expectations. We evaluate Clustrophile 2 through a user study with 12 data scientists, who used our tool to explore and interpret sub-cohorts in a dataset of Parkinson's disease patients. Results suggest that Clustrophile 2 improves the speed and effectiveness of exploratory clustering analysis for both experts and non-experts.",
                    image: './assets/main-panel/article-images/article2.png',
                    keywords: ['Clustering Tour', 'Guided Data Analysis', 'Unsupervised Learning'],
                    cite: 3,
                    comment: 52,
                    trend: 60
                },
                {
                    id: 2,
                    group: 2,
                    readLater: true,
                    type: "Journal Article",
                    author: "Alex Bigelow",
                    date: "January 2019",
                    position: "arXiv:1812.06337 [physics]",
                    title: 'Origraph: Interactive Network Wrangling',
                    abstract: "Networks are a natural way of thinking about many datasets. The data on which a network is based, however, is rarely collected in a form that suits the analysis process, making it necessary to create and reshape networks. Data wrangling is widely acknowledged to be a critical part of the data analysis pipeline, yet interactive network wrangling has received little attention in the visualization research community. In this paper, we discuss a set of operations that are important for wrangling network datasets and introduce a visual data wrangling tool, Origraph, that enables analysts to apply these operations to their datasets. Key operations include creating a network from source data such as tables, reshaping a network by introducing new node or edge classes, filtering nodes or edges, and deriving new node or edge attributes. Our tool, Origraph, enables analysts to execute these operations with little to no programming, and to immediately visualize the results. Origraph provides views to investigate the network model, a sample of the network, and node and edge attributes. In addition, we introduce interfaces designed to aid analysts in specifying arguments for sensible network wrangling operations. We demonstrate the usefulness of Origraph in two Use Cases: first, we investigate gender bias in the film industry, and then the influence of money on the political support for the war in Yemen.",
                    image: './assets/main-panel/article-images/article3.png',
                    keywords: ['Human Center', 'Information System', 'Network'],
                    cite: 8,
                    comment: 53,
                    trend: 46
                },
                {
                    id: 3,
                    group: 2,
                    readLater: true,
                    type: "Journal Article",
                    author: "Omar Alonso",
                    date: "2019-07-18",
                    position: "SIGIR '19: The 42nd International ACM SIGIR Conference on Research and Development in Information Retrieval",
                    title: 'Social Knowledge Graph Explorer',
                    abstract: "We present SKG Explorer, an application for querying and browsing a social knowledge graph derived from Twitter that contains relationships between entities, links, and topics. A temporal dimension is also added for generating timelines for well-known events that allows the construction of stories in a wiki-like style. In this paper we describe the main components of the system and showcase some examples.",
                    image: './assets/main-panel/article-images/article4.png',
                    keywords: ['SKG Explorer', 'Twitter', 'Wiki-like'],
                    cite: 2,
                    comment: 34,
                    trend: 34
                }
            ]
        }
    },
    created() {
        emitter.on('updateGroup', (selectedItem) => {
            this.groupIndex = selectedItem;
        })
    },
    computed: {
        groupTitle() {
            return this.groupTitles[this.groupIndex];
        },
        activeArticles() {
            let active = [];
            if (this.groupIndex == 0) {
                active = this.articles;
            } else if (this.groupIndex == 1) {
                for (i in this.articles) {
                    if (this.articles[i].readLater) {
                        active.push(this.articles[i]);
                    }
                }
            } else {
                for (i in this.articles) {
                    if (this.articles[i].group == this.groupIndex) {
                        active.push(this.articles[i]);
                    }
                }
            }
            return active;
        }
    }
})
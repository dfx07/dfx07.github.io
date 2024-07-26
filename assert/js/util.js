
var all_post_loader ={
    /**
     * Add all post index panel
     * @param {*} $root_tag 
     * Note : Function internal  
     */
    add_all_post : function($root_tag){
        const str_div_all_post =`<div class="articles">\
                                    <div class="archives-header">\
                                        <span><b>Danh mục bài viết</b></span>\
                                    </div>\
                                <div class="archives-list">\
                                    <nav class="tree-nav">\
                                        <div class="tree-nav__item">
                                        <div class="side-navigation-scrollable-list">

    <ul>

        <li class="expandable" data-pageid="1157466040">
            <div class="side-navigation-expander">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                        fill="currentColor" fill-rule="evenodd"></path>
                </svg>
            </div>

            <a href="/display/CONF719/Get+started">Get started</a>

            <ul>

                <li class="expandable" data-pageid="1157466042">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Tutorial%3A+Navigate+Confluence">Tutorial: Navigate Confluence</a>

                    <ul>

                        <li class="" data-pageid="1157466050">
                            <a href="/display/CONF719/The+dashboard">The dashboard</a>
                        </li>

                        <li class="" data-pageid="1157466066">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/The+space+directory">The space directory</a>

                        </li>

                        <li class="" data-pageid="1157466069">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/The+space+sidebar">The space sidebar</a>

                        </li>

                        <li class="" data-pageid="1157466071">
                            <a href="/display/CONF719/Keyboard+shortcuts">Keyboard shortcuts</a>
                        </li>

                        <li class="" data-pageid="1157466084">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Complete+your+mission">Complete your mission</a>

                        </li>
                    </ul>
                </li>

                <li class="expandable" data-pageid="1157466091">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Tutorial%3A+Space+ace">Tutorial: Space ace</a>

                    <ul>

                        <li class="" data-pageid="1157466093">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+a+project+space">Create a project space</a>

                        </li>

                        <li class="" data-pageid="1157466095">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+your+personal+space">Create your personal space</a>

                        </li>

                        <li class="" data-pageid="1157466097">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+the+team%27s+PR+space">Create the team's PR space</a>

                        </li>

                        <li class="" data-pageid="1157466099">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Delete+and+archive+spaces">Delete and archive spaces</a>

                        </li>
                    </ul>
                </li>
            </ul>
        </li>

        <li class="expandable" data-pageid="1157466101">
            <div class="side-navigation-expander">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                        fill="currentColor" fill-rule="evenodd"></path>
                </svg>
            </div>

            <a href="/display/CONF719/Spaces">Spaces</a>

            <ul>

                <li class="expandable" data-pageid="1157466107">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Create+a+Space">Create a Space</a>

                    <ul>

                        <li class="" data-pageid="1157466114">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+a+Space+From+a+Template">Create a Space From a Template</a>

                        </li>

                        <li class="" data-pageid="1157466116">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Space+Keys">Space Keys</a>

                        </li>
                    </ul>
                </li>

                <li class="" data-pageid="1157466118">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Navigate+Spaces">Navigate Spaces</a>

                </li>

                <li class="expandable" data-pageid="1157466121">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Space+Permissions+Overview">Space Permissions Overview</a>

                    <ul>

                        <li class="" data-pageid="1157466124">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Assign+Space+Permissions">Assign Space Permissions</a>

                        </li>

                        <li class="" data-pageid="1157466134">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Make+a+Space+Public">Make a Space Public</a>

                        </li>

                        <li class="" data-pageid="1157466136">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Give+Access+to+Unlicensed+Users+from+Jira+Service+Management">Give
                                Access to Unlicensed Users from Jira Service Management</a>

                        </li>
                    </ul>
                </li>

                <li class="expandable" data-pageid="1157466138">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Organize+your+Space">Organize your Space</a>

                    <ul>

                        <li class="" data-pageid="1157466146">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Set+up+a+Space+Home+Page">Set up a Space Home Page</a>

                        </li>

                        <li class="" data-pageid="1157466149">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Use+Labels+to+Categorize+Spaces">Use Labels to Categorize
                                Spaces</a>

                        </li>
                    </ul>
                </li>

                <li class="expandable" data-pageid="1157466154">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Customize+your+Space">Customize your Space</a>

                    <ul>

                        <li class="" data-pageid="1157466157">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Configure+the+Sidebar">Configure the Sidebar</a>

                        </li>

                        <li class="" data-pageid="1157466164">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Edit+a+Space%27s+Color+Scheme">Edit a Space's Color Scheme</a>

                        </li>

                        <li class="expandable" data-pageid="1157466168">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Apply+a+Theme+to+a+Space">Apply a Theme to a Space</a>

                            <ul>

                                <li class="" data-pageid="1157466170">
                                    <div class="side-navigation-expander">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <path
                                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                                fill="currentColor" fill-rule="evenodd"></path>
                                        </svg>
                                    </div>

                                    <a href="/display/CONF719/Documentation+theme+migration+FAQ">Documentation theme
                                        migration FAQ</a>

                                </li>
                            </ul>
                        </li>

                        <li class="" data-pageid="1157466176">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Customize+Space+Layouts">Customize Space Layouts</a>

                        </li>

                        <li class="" data-pageid="1333330117">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Change+the+Space+Logo">Change the Space Logo</a>

                        </li>
                    </ul>
                </li>

                <li class="" data-pageid="1157466180">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Archive+a+Space">Archive a Space</a>

                </li>

                <li class="" data-pageid="1157466185">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Delete+a+Space">Delete a Space</a>

                </li>

                <li class="expandable" data-pageid="1157466188">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Export+Content+to+Word%2C+PDF%2C+HTML+and+XML">Export Content to Word,
                        PDF, HTML and XML</a>

                    <ul>

                        <li class="expandable" data-pageid="1157466190">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Customize+Exports+to+PDF">Customize Exports to PDF</a>

                            <ul>

                                <li class="" data-pageid="1157466192">
                                    <div class="side-navigation-expander">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <path
                                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                                fill="currentColor" fill-rule="evenodd"></path>
                                        </svg>
                                    </div>

                                    <a href="/display/CONF719/Advanced+PDF+Export+Customizations">Advanced PDF Export
                                        Customizations</a>

                                </li>

                                <li class="" data-pageid="1157466193">
                                    <div class="side-navigation-expander">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <path
                                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                                fill="currentColor" fill-rule="evenodd"></path>
                                        </svg>
                                    </div>

                                    <a href="/display/CONF719/Create+a+PDF+in+Another+Language">Create a PDF in Another
                                        Language</a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>

        <li class=" expandable" data-pageid="1157466194">
            <div class="side-navigation-expander">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                        fill="currentColor" fill-rule="evenodd"></path>
                </svg>
            </div>

            <a href="/display/CONF719/Pages+and+blogs">Pages and blogs</a>

            <ul>

                <li class="" data-pageid="1157466196">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Create+and+Edit+Pages">Create and Edit Pages</a>

                </li>

                <li class="" data-pageid="1157466201">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Blog+Posts">Blog Posts</a>

                </li>

                <li class=" expandable" data-pageid="1157466203">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/The+Editor">The Editor</a>

                    <ul>

                        <li class="" data-pageid="1157466230">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Symbols%2C+Emoticons+and+Special+Characters">Symbols, Emoticons
                                and Special Characters</a>

                        </li>

                        <li class="" data-pageid="1157466236">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Collaborative+editing">Collaborative editing</a>

                        </li>
                    </ul>
                </li>

                <li class="" data-pageid="1157466252">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Move+and+Reorder+Pages">Move and Reorder Pages</a>

                </li>

                <li class="" data-pageid="1157466270">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Copy+a+Page">Copy a Page</a>

                </li>

                <li class="" data-pageid="1157466274">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Delete+or+Restore+a+Page">Delete or Restore a Page</a>

                </li>

                <li class=" expandable" data-pageid="1157466276">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Add%2C+Remove+and+Search+for+Labels">Add, Remove and Search for Labels</a>

                    <ul>

                        <li class="" data-pageid="1157466282">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Display+Pages+with+Label+Macros">Display Pages with Label
                                Macros</a>

                        </li>
                    </ul>
                </li>

                <li class=" expandable" data-pageid="1157466283">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Drafts">Drafts</a>

                    <ul>

                        <li class="" data-pageid="1157466295">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Concurrent+Editing+and+Merging+Changes">Concurrent Editing and
                                Merging Changes</a>

                        </li>
                    </ul>
                </li>

                <li class="" data-pageid="1157466300">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Page+Restrictions">Page Restrictions</a>

                </li>

                <li class="" data-pageid="1157466317">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Links">Links</a>

                </li>

                <li class="" data-pageid="1157466320">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Anchors">Anchors</a>

                </li>

                <li class="" data-pageid="1157466324">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Tables">Tables</a>

                </li>

                <li class="" data-pageid="1157466386">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Add%2C+Assign%2C+and+View+Tasks">Add, Assign, and View Tasks</a>

                </li>

                <li class="" data-pageid="1157466394">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Autocomplete+for+links%2C+files%2C+macros+and+mentions">Autocomplete for
                        links, files, macros and mentions</a>

                </li>

                <li class="" data-pageid="1157466405">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Page+Layouts%2C+Columns+and+Sections">Page Layouts, Columns and
                        Sections</a>

                </li>

                <li class="" data-pageid="1157466419">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Create+Beautiful+and+Dynamic+Pages">Create Beautiful and Dynamic Pages</a>

                </li>

                <li class=" expandable" data-pageid="1157466431">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Page+Templates">Page Templates</a>

                    <ul>

                        <li class="" data-pageid="1157466432">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+a+Template">Create a Template</a>

                        </li>

                        <li class="" data-pageid="1157466451">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+a+Page+from+a+Template">Create a Page from a Template</a>

                        </li>
                    </ul>
                </li>

                <li class=" expandable" data-pageid="1157466459">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Blueprints">Blueprints</a>

                    <ul>

                        <li class="" data-pageid="1157466464">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Decisions+Blueprint">Decisions Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466473">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/File+List+Blueprint">File List Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466480">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Meeting+Notes+Blueprint">Meeting Notes Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466489">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Product+Requirements+Blueprint">Product Requirements Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466494">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Shared+Links+Blueprint">Shared Links Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466496">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Jira+Report+Blueprint">Jira Report Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466501">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Retrospective+Blueprint">Retrospective Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466505">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/How-To+Article+Blueprint">How-To Article Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466508">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Troubleshooting+Article+Blueprint">Troubleshooting Article
                                Blueprint</a>

                        </li>

                        <li class="" data-pageid="1157466511">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Create+a+Blueprint-Style+Report">Create a Blueprint-Style
                                Report</a>

                        </li>
                    </ul>
                </li>

                <li class=" expandable" data-pageid="1157466528">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Import+Content+Into+Confluence">Import Content Into Confluence</a>

                    <ul>

                        <li class="" data-pageid="1157466529">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Import+a+Word+Document+into+Confluence">Import a Word Document
                                into Confluence</a>

                        </li>
                    </ul>
                </li>

                <li class="" data-pageid="1157466542">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Undefined+Page+Links">Undefined Page Links</a>

                </li>

                <li class="" data-pageid="1157466545">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/View+Page+Information">View Page Information</a>

                </li>

                <li class="" data-pageid="1157466548">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Page+History+and+Page+Comparison+Views">Page History and Page Comparison
                        Views</a>

                </li>

                <li class=" expandable" data-pageid="1157466553">
                    <div class="side-navigation-expander">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <a href="/display/CONF719/Confluence+Markup">Confluence Markup</a>

                    <ul>

                        <li class="" data-pageid="1157466554">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Confluence+Storage+Format">Confluence Storage Format</a>

                        </li>

                        <li class="" data-pageid="1157466569">
                            <div class="side-navigation-expander">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path
                                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                            </div>

                            <a href="/display/CONF719/Confluence+Wiki+Markup">Confluence Wiki Markup</a>

                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
                                        
                                        </div>\
                                    </nav>\
                                </div>\
                            </div>`;

        $root_tag.prepend(str_div_all_post);
    },

    add_table_of_content: function($root_tag){
        const str_div_table_of_content= '<div class="articles article-table-of-contents">\
                                            <div class="archives-header">\
                                                <span><b>Mục lục</b></span>\
                                            </div>\
                                            <div class="archives-table-of-contents">\
                                                <md-block src="content_index.md"></md-block>\
                                            </div>\
                                        </div>';
        $root_tag.append(str_div_table_of_content);                                  
    }
}


var src_loader ={

    /**================================ Public function ============================= */
    /**
     * Load css file
     * @param {*} $root_path : path load
     * @param {*} $obj_type_src : object = {mediatype + src filename}
     */
    load_css : function($root_path, $arr_objCssNsrc){

        $.each($arr_objCssNsrc, function(index, objCssIf){
            var css_tag = document.createElement("link");
            css_tag.href = $root_path + objCssIf.src;
            css_tag.rel = "stylesheet";
            css_tag.style = "text/css"
            if(objCssIf.media != undefined){
                css_tag.media = objCssIf.media;
            }
    
            $("head").append(css_tag); 
        });
    },

    load_js : function($root_path, $arr_objJsNsrc){

        $.each($arr_objJsNsrc, function(index, objJsIf){
            var js_tag = document.createElement("script");
            if(objJsIf.type != undefined){
                js_tag.type = objJsIf.type;
            }
            js_tag.src =  $root_path + objJsIf.src;
            $("head").append(js_tag); 
        });
    },
}

/** Define export */
export {src_loader}
export {all_post_loader}


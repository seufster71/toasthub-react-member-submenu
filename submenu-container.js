/*
* Author Edward Seufert
*/
'use-strict';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as appPrefActions from '../../core/common/apppref-actions';
import fuLogger from '../../core/common/fu-logger';
import SubMenuView from '../../memberView/submenu/submenu-view';


function SubMenuContainer() {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	
	const changeTab = (code,index) => {
      navigate(index);
  	}

	fuLogger.log({level:'TRACE',loc:'SubMenuContainer::render',msg:"Hi there"});
	const path = location.pathname;
	let topMenus = appMenus[appPrefs.memberMenu];
	let children = [];
	if (topMenus != null) {
		for (let m = 0; m < topMenus.length; m++) {
			if (topMenus[m].values[0].rendered) {
				if (path.includes(topMenus[m].values[0].href)){
					if (topMenus[m].children != null && topMenus[m].children.length > 0){
						children = topMenus[m].children;
					}
				}
			}
		}
	}
    return (
		<SubMenuView menus={children} changeTab={this.changeTab}/>
	);
}

export default SubMenuContainer;

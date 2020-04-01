import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import WBSunnyIcon from '@material-ui/icons/WbSunnyOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import ReactTooltip from 'react-tooltip';

export default function Toolbar({ toggle, setSidebar, showSideBar }) {
	return (
		<div className="toolbar">
			<span href="#" onClick={() => setSidebar(!showSideBar)}>
				{showSideBar ? <ArrowBackIosIcon fontSize="small" /> : <ArrowForwardIosIcon fontSize="small" />}
			</span>
			<div>
				<span data-tip="Change mode" className="round-button-inverse" onClick={toggle}>
					<ReactTooltip effect="solid" place="right" />
					<WBSunnyIcon fontSize="small" />
				</span>
				<a
					target="_BLANK"
					rel="noopener noreferrer"
					href="https://github.com/PJijin/React-Video-Playlist"
					data-tip="View On Github"
					className="round-button-inverse"
				>
					<ReactTooltip effect="solid" place="right" />
					<CodeIcon fontSize="small" /> Github
				</a>
			</div>
		</div>
	);
}

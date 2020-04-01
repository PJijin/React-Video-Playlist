import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import ReactTooltip from 'react-tooltip';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ClearAllIcon from '@material-ui/icons/ClearAllOutlined';
import { validURL } from './helpers/validUrl';
import VideoPlayer from './VideoPlayer';
import Toolbar from './Toolbar';
import PlayList from './PlayList';

const handlePlaylist = (value, setVideos) => {
	const urls = value.replace(/(\r\n|\n|\r)/gm, '').split(',');
	let error = 0;

	const matches = value.match(/\[(.*?)\]/);
	const spaceDetect = value.includes(' ');

	const storeVideos = urlList => {
		localStorage.setItem('videos', JSON.stringify(urlList));
		setVideos(urlList);
	};

	if (!matches && !spaceDetect) {
		urls.map(url => {
			if (!validURL(url.trim())) {
				error = 1;
			}
			return true;
		});
	}

	if (matches && !spaceDetect) {
		const submatch = matches[1];
		const urlArray = [];
		Array.from({ length: submatch }, (_, x) => {
			return urlArray.push({ url: value.replace(`[${submatch}]`, x + 1) });
		});
		storeVideos(urlArray);
		return true;
	} else if (spaceDetect && !matches) {
		const urlArray = [];

		urls.map(url => {
			const data = url.trim().split(' ');
			// if (!validURL(data[1].trim())) {
			// 	error = 1;
			// }
			return urlArray.push({ name: data[0], url: data[1] });
		});
		storeVideos(urlArray);

		return true;
	} else if (error === 0) {
		const urlArray = [];

		urls.map(url => {
			return urlArray.push({ url });
		});
		storeVideos(urlArray);
		return true;
	} else return false;
};

const videosInitialData = () => {
	const lData = localStorage.getItem('videos');
	console.log(lData);
	const videosData = JSON.parse(lData);
	if (videosData) return videosData;
	return [];
};

function App() {
	const darkMode = useDarkMode(false);
	const [videos, setVideos] = useState(videosInitialData());
	const [currentVideo, setCurrentVideo] = useState(videos[0]);
	const [showListMode, setShowListMode] = useState(false);
	const [showSideBar, setSidebar] = useState(true);
	const [error, setError] = useState(false);

	const showList = () => {
		setShowListMode(!showListMode);
	};

	return (
		<div className="App d-flex">
			{showSideBar && (
				<div className="sidebar">
					<div className="right">
						<div data-tip="Add Playlist" className="round-button" onClick={() => showList()}>
							<ReactTooltip effect="solid" place="right" />
							<PlaylistAddIcon />
						</div>

						<div
							data-tip="Clear Playlist"
							className="round-button"
							onClick={() => {
								setVideos([]);
								localStorage.removeItem('videos');
							}}
						>
							<ReactTooltip effect="solid" place="right" />
							<ClearAllIcon fontSize="small" />
						</div>
					</div>
					{showListMode && (
						<form
							onSubmit={e => {
								e.preventDefault();
								if (handlePlaylist(e.target.playlisturls.value, setVideos)) {
									showList();
									setError();
								} else setError('URL List contains invalid URL');
							}}
							className="playlist-form"
						>
							{error && <div className="alert-error">{error}</div>}
							<textarea
								name="playlisturls"
								required
								placeholder="Add video's to playlist (separated by comma)"
							/>
							<button className="right button-primary">Save Playlist</button>
						</form>
					)}

					<PlayList
						videos={videos}
						currentVideo={currentVideo}
						setCurrentVideo={setCurrentVideo}
						setVideos={setVideos}
					/>
				</div>
			)}

			<div className="video-player-section">
				<Toolbar toggle={darkMode.toggle} setSidebar={setSidebar} showSideBar={showSideBar} />
				<div className="grow d-flex center">
					<div className="w-100">
						<VideoPlayer currentVideo={currentVideo} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

/**
 *
 * Reldens - MapsLoader
 *
 * This module is the only one with a dynamic require and only handles that.
 * It loads all the maps in the server side at once.
 *
 */

const fs = require('fs');
const { ErrorManager } = require('@reldens/utils');

class MapsLoader
{

    loadMaps(themeFolder, configManager)
    {
        if(!themeFolder){
            ErrorManager.error('Theme folder not defined!');
        }
        let mapsFolder = '/assets/maps/';
        let dirCont = fs.readdirSync(themeFolder+mapsFolder);
        let files = dirCont.filter(function(elm){
            return elm.match(/.*\.(json)/ig);
        });
        configManager.configList.server.maps = {};
        for(let file of files){
            let fileFullPath = themeFolder+mapsFolder+file;
            let fileName = file.replace('.json', '');
            // @TODO: improve, this is not a good practice but is the only dynamic required I wasn't able to avoid yet.
            configManager.configList.server.maps[fileName] = require(fileFullPath);
        }
    }

}

module.exports.MapsLoader = new MapsLoader();

import dat from 'dat.gui'
import { createContainer } from 'unstated-next'
import { useState, useEffect, useCallback } from 'react'

const setIn = (obj, path, value) => {
    if (path.length === 1) {
        return {
            ...obj,
            [path[0]]: value,
        };
    }

    return {
        ...obj,
        [path[0]]: setIn(obj[path[0]], path.slice(1), value),
    };
};

const createStateChangers = (config, setState, currentPath = '') => {
    return Object.keys(config).reduce((acc, key) => {
        if (config[key].hasOwnProperty('value') && config[key].hasOwnProperty('bounds')) {
            // Construct the full path for this key
            const fullPath = currentPath ? `${currentPath}.${key}` : key;

            acc[key] = (value) => setState((prevState) => {
                // Dynamically set the nested state using the full path
                const newState = { ...prevState };
                setByPath(newState, fullPath, value);
                return newState;
            });
            // console.log({ acc, fullPath })
        } else {
            // If not a leaf node, go deeper into the structure
            acc[key] = createStateChangers(config[key], setState, key);
        }
        return acc;
    }, {});
};

// Helper function to set nested values based on a path string
// Helper function to set nested values based on a path string
const setByPath = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    keys.forEach((key, index) => {
        // If it's the last key, set the value
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            // Otherwise, if this level doesn't exist, create it
            current[key] = current[key] || {};
            current = current[key];
        }
    });
}


const digest = (CONFIG_OBJECT, FOLDER, stateChangers, currentPath = '') => {
    for (const category in CONFIG_OBJECT) {
        const fullPath = currentPath ? `${currentPath}.${category}` : category;
        
        // Check if current category is an object (i.e., it has nested controls or folders)
        if (typeof CONFIG_OBJECT[category] === 'object' && !Array.isArray(CONFIG_OBJECT[category])) {
            if (CONFIG_OBJECT[category].bounds) { // It's a control
                // console.log({ fullPath, curr: CONFIG_OBJECT, category })
                const addObject = {
                    CONFIG_OBJECT,
                    object: { [category]: CONFIG_OBJECT[category].value },
                    property: category,
                    min: CONFIG_OBJECT[category].bounds[0],
                    max: CONFIG_OBJECT[category].bounds[1],
                    step: CONFIG_OBJECT[category].bounds[2] || 1       

                }
                // console.log({ addObject })
                FOLDER.add(
                    {[category]: CONFIG_OBJECT[category].value}, 
                    category, 
                    CONFIG_OBJECT[category].bounds[0], 
                    CONFIG_OBJECT[category].bounds[1], 
                    CONFIG_OBJECT[category].bounds[2] || 1
                ).onChange((value) => {
                    const stateChanger = getByPath(stateChangers, fullPath);
                    if (stateChanger) {
                        stateChanger(value);
                    }
                });
            } else { // It's a folder
                const NEW_FOLDER = FOLDER.addFolder(category);
                digest(CONFIG_OBJECT[category], NEW_FOLDER, stateChangers, fullPath);
            }
        }
    }
};


// Helper function to get nested values based on a path string
const getByPath = (obj, path) => {
    const keys = path.split('.');
    let current = obj;
    keys.forEach((key) => {
        current = current[key];
    });
    return current;
};

const extractInitialValues = (config) => {
    return Object.keys(config).reduce((acc, key) => {
      if (config[key].hasOwnProperty('value') && config[key].hasOwnProperty('bounds')) {
        acc[key] = config[key].value;
      } else {
        acc[key] = extractInitialValues(config[key]);
      }
      return acc;
    }, {});
  };
  



const GUIContainer = (initialState) => {
    const [state, setState] = useState(extractInitialValues(initialState.datGuiOptions))

    const guiCallback = useCallback(() => new dat.GUI({
        autoPlace: false,

    }), [])

    useEffect(() => {
        const gui = guiCallback()

        // Note: You should rename initialState.CONFIG to initialState.datGuiOptions or something more appropriate
        const stateChangers = createStateChangers(initialState.datGuiOptions, setState);

        // Use the new digest function with the combined datGuiOptions
        digest(initialState.datGuiOptions, gui, stateChangers)

        gui.domElement.id = initialState.id
        initialState.ref.current.appendChild(gui.domElement)

        return () => gui.destroy()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return { ...state }
}

const Container = createContainer(GUIContainer)

export default Container

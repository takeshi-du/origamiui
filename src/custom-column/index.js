import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as ColumnIcon } from '../../assets/images/column.svg';

registerBlockType(metadata.name, {
    icon: <ColumnIcon />,
    edit: Edit,
    save: Save,
});
import React, { useMemo, useCallback } from 'react'
import Separator from '../../atoms/Separator'
import { Paragraph } from '../../atoms/Text'
import { Tree, TreeNode } from 'react-organizational-chart'
import { Node } from './style'

const OrganizationChart = ({ data }) => {

    const root = useMemo(() => {
        let _root
        data.forEach((firstRow) => {
            if (_root) return
            _root = data.find((secondRow) => firstRow.id !== secondRow.idlider)
        })
        return _root || {}
    }, [data])

    const calculateTree = useCallback((newData) => {
        const _tree = []
        newData.forEach((firstRow) => {
            const children = []
            data.forEach((secondRow) => {
                if (firstRow.id === secondRow.idlider) {
                    const a = calculateTree([secondRow])
                    children.push(a[0])
                }
            })

            if (firstRow.id === root.id) {
                _tree.push(children)
            } else {
                _tree.push(
                    <TreeNode label={
                        <Node>
                            <Paragraph>{firstRow.nombre}</Paragraph>
                            <Separator />
                            <Paragraph>{firstRow['niveljerárquico'].toUpperCase()}</Paragraph>
                            <Paragraph>{`${firstRow['división']} > ${firstRow.area} > ${firstRow.subarea}`}</Paragraph>
                            <br />
                            <Paragraph>{`Fecha de ingreso: ${firstRow.fechadeingreso}`}</Paragraph>
                        </Node>
                    }>
                        {children}
                    </TreeNode>
                )
            }
        }, [])

        return _tree
    }, [data, root])

    if (!data.length) return null

    return (
        <Tree
            lineWidth={'1px'}
            lineColor={'white'}
            lineBorderRadius={'10px'}
            label={
                <Node>
                    <Paragraph>{root.nombre}</Paragraph>
                    <Separator />
                    <Paragraph>{root['niveljerárquico'].toUpperCase()}</Paragraph>
                    <Paragraph>{`${root['división']} > ${root.area} > ${root.subarea}`}</Paragraph>
                    <br />
                    <Paragraph>{`Fecha de ingreso: ${root.fechadeingreso}`}</Paragraph>
                </Node>
            }
        >
        {calculateTree([root])}
        {/* <TreeNode label={<Node>Child 1</Node>}>
          <TreeNode label={<Node>Grand Child</Node>} />
        </TreeNode>
        <TreeNode label={<Node>Child 2</Node>}>
          <TreeNode label={<Node>Grand Child</Node>}>
            <TreeNode label={<Node>Great Grand Child 1</Node>} />
            <TreeNode label={<Node>Great Grand Child 2</Node>} />
          </TreeNode>
        </TreeNode>
        <TreeNode label={<Node>Child 3</Node>}>
          <TreeNode label={<Node>Grand Child 1</Node>} />
          <TreeNode label={<Node>Grand Child 2</Node>} />
        </TreeNode> */}
      </Tree>
    )
}

export default OrganizationChart
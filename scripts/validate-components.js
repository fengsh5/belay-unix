/**
 * 组件验证脚本
 * 检查所有组件的 props 类型定义和样式完整性
 */

const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR = path.join(__dirname, '../uni_modules/belay-unix/components')
const TYPE_DEFS_FILE = path.join(__dirname, '../uni_modules/belay-unix/index.d.ts')

// 从 index.d.ts 提取组件类型定义
function extractTypeDefinitions() {
	const content = fs.readFileSync(TYPE_DEFS_FILE, 'utf-8')
	const typeMap = new Map()

	// 提取所有类型别名定义
	const typeAliasRegex = /export type (\w+) = ([^;\n]+)/g
	let match
	while ((match = typeAliasRegex.exec(content)) !== null) {
		const [, typeName, typeValue] = match
		// 解析联合类型
		const options = typeValue
			.split('|')
			.map(v => v.trim().replace(/'/g, ''))
			.filter(v => v && v !== 'null')
		typeMap.set(typeName, options)
	}

	// 提取组件 Props 定义
	const componentPropsRegex = /export type (Bl\w+Props) = \{([^}]+)\}/gs
	const propsMap = new Map()

	while ((match = componentPropsRegex.exec(content)) !== null) {
		const [, propsName, propsBody] = match
		const componentName = propsName.replace('Props', '')
		
		// 提取 props 中的类型字段
		const propRegex = /(\w+)\?: (\w+)/g
		const props = {}
		let propMatch
		while ((propMatch = propRegex.exec(propsBody)) !== null) {
			const [, propName, propType] = propMatch
			if (typeMap.has(propType)) {
				props[propName] = {
					type: propType,
					options: typeMap.get(propType)
				}
			}
		}
		
		if (Object.keys(props).length > 0) {
			propsMap.set(componentName, props)
		}
	}

	return propsMap
}

// 检查组件文件中的 props 定义
function checkComponentProps(componentDir, expectedProps) {
	const results = {
		vue: { valid: true, issues: [] },
		uvue: { valid: true, issues: [] }
	}

	// 检查 .vue 文件
	const vueFile = path.join(componentDir, 'index.vue')
	if (fs.existsSync(vueFile)) {
		const content = fs.readFileSync(vueFile, 'utf-8')
		
		for (const [propName, propInfo] of Object.entries(expectedProps)) {
			// 检查是否使用了类型别名（错误）
			const typeAliasRegex = new RegExp(`${propName}:\\s*\\{[^}]*type:\\s*${propInfo.type}`, 's')
			if (typeAliasRegex.test(content)) {
				results.vue.valid = false
				results.vue.issues.push(`使用了 TypeScript 类型别名 "${propInfo.type}"，应使用 "String"`)
			}
		}
	}

	// 检查 .uvue 文件
	const uvueFile = path.join(componentDir, 'index.uvue')
	if (fs.existsSync(uvueFile)) {
		const content = fs.readFileSync(uvueFile, 'utf-8')
		
		for (const [propName, propInfo] of Object.entries(expectedProps)) {
			// 确保使用了 String
			const stringTypeRegex = new RegExp(`${propName}:\\s*\\{[^}]*type:\\s*String`, 's')
			if (!stringTypeRegex.test(content)) {
				// 检查是否存在该 prop
				const propExistsRegex = new RegExp(`${propName}:\\s*\\{`, 's')
				if (propExistsRegex.test(content)) {
					results.uvue.valid = false
					results.uvue.issues.push(`"${propName}" 未使用 String 类型`)
				}
			}
		}
	}

	return results
}

// 检查样式文件是否包含所有必要的类
function checkComponentStyles(componentDir, componentName, expectedProps) {
	const results = { valid: true, missing: [] }
	
	const scssFile = path.join(componentDir, 'index.scss')
	if (!fs.existsSync(scssFile)) {
		return results
	}

	const content = fs.readFileSync(scssFile, 'utf-8')
	const kebabName = componentName
		.replace(/([A-Z])/g, '-$1')
		.toLowerCase()
		.substring(1) // 移除开头的 '-'

	for (const [propName, propInfo] of Object.entries(expectedProps)) {
		if (['type', 'size', 'effect', 'theme', 'shape', 'mode'].includes(propName)) {
			// 检查每个选项是否有对应样式类
			for (const option of propInfo.options) {
				const className = `.${kebabName}--${option}`
				if (!content.includes(className)) {
					results.valid = false
					results.missing.push(`${propName}="${option}" (缺少 ${className})`)
				}
			}
		}
	}

	return results
}

// 主验证函数
function validateComponents() {
	console.log('🔍 开始验证组件...\n')
	
	const propsMap = extractTypeDefinitions()
	console.log(`✅ 从 index.d.ts 提取了 ${propsMap.size} 个组件的类型定义\n`)

	const results = []
	const components = fs.readdirSync(COMPONENTS_DIR).filter(name => name.startsWith('bl-'))

	for (const componentName of components) {
		const componentDir = path.join(COMPONENTS_DIR, componentName)
		if (!fs.statSync(componentDir).isDirectory()) continue

		const kebabName = componentName
		const pascalName = componentName
			.split('-')
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join('')

		const expectedProps = propsMap.get(pascalName) || {}
		
		if (Object.keys(expectedProps).length === 0) {
			continue // 没有需要验证的 props
		}

		const propsResults = checkComponentProps(componentDir, expectedProps)
		const stylesResults = checkComponentStyles(componentDir, pascalName, expectedProps)

		results.push({
			name: kebabName,
			hasIssues: !propsResults.vue.valid || !propsResults.uvue.valid || !stylesResults.valid,
			props: propsResults,
			styles: stylesResults
		})
	}

	// 输出报告
	console.log('📊 验证报告\n')
	console.log('=' .repeat(80))

	const componentsWithIssues = results.filter(r => r.hasIssues)
	const componentsOk = results.filter(r => !r.hasIssues)

	if (componentsWithIssues.length === 0) {
		console.log('\n✅ 所有组件验证通过！\n')
	} else {
		console.log(`\n⚠️  发现 ${componentsWithIssues.length} 个组件存在问题：\n`)
		
		for (const result of componentsWithIssues) {
			console.log(`\n📦 ${result.name}`)
			console.log('-'.repeat(80))
			
			if (!result.props.vue.valid) {
				console.log('  ❌ Vue 2 (.vue) Props 问题:')
				result.props.vue.issues.forEach(issue => console.log(`     - ${issue}`))
			}
			
			if (!result.props.uvue.valid) {
				console.log('  ❌ UTS (.uvue) Props 问题:')
				result.props.uvue.issues.forEach(issue => console.log(`     - ${issue}`))
			}
			
			if (!result.styles.valid) {
				console.log('  ❌ 样式缺失:')
				result.styles.missing.forEach(missing => console.log(`     - ${missing}`))
			}
		}
	}

	console.log('\n' + '='.repeat(80))
	console.log(`\n✅ 验证通过: ${componentsOk.length}`)
	console.log(`⚠️  存在问题: ${componentsWithIssues.length}`)
	console.log(`📊 总计: ${results.length}\n`)

	// 返回退出码
	return componentsWithIssues.length === 0 ? 0 : 1
}

// 运行验证
const exitCode = validateComponents()
process.exit(exitCode)


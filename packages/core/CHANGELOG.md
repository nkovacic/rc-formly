# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.7.0](https://github.com/nkovacic/rc-formly/compare/v0.6.0...v0.7.0) (2020-01-23)


### Bug Fixes

* **core:** every RcFormlyField now has a unique id for easier rendering. ([534457c](https://github.com/nkovacic/rc-formly/commit/534457c))
* **core:** if empty type and wrapper, fieldGroup should still be rendered. ([ab437eb](https://github.com/nkovacic/rc-formly/commit/ab437eb))
* **core:** nested validation now works. ([defb388](https://github.com/nkovacic/rc-formly/commit/defb388))
* **core:** RcFormlyArrayField getFieldValue now honors dotNotation properties. ([9dc791d](https://github.com/nkovacic/rc-formly/commit/9dc791d))
* **core:** RcFormlyField shouldComponentUpdate now correctly gets nested property value for checking. ([d4ff3c5](https://github.com/nkovacic/rc-formly/commit/d4ff3c5))
* **core:** replaceValues func in RcFormlyForm should be scoped to this. ([3c25c30](https://github.com/nkovacic/rc-formly/commit/3c25c30))


### Features

* **core:** added generic extender for IFormlyFieldConfig template options. ([46ff081](https://github.com/nkovacic/rc-formly/commit/46ff081))
* **core:** added replaceValues for directly replacing values. ([f2e71d2](https://github.com/nkovacic/rc-formly/commit/f2e71d2))
* **core:** added submitCount to RcFormlyFormProps. ([321008f](https://github.com/nkovacic/rc-formly/commit/321008f))
* **core:** copied getFieldError, wasFieldTouched  and wasFormSubmitted methods to RcFormlyWrapper. ([be2b2fc](https://github.com/nkovacic/rc-formly/commit/be2b2fc))
* **core:** exposed RcFormlyFieldRenderer to outside usage. ([ec5f24e](https://github.com/nkovacic/rc-formly/commit/ec5f24e))
* **core:** RcFormlyArrayField getFieldValue now can get other keys, not just current field one. ([7f748d9](https://github.com/nkovacic/rc-formly/commit/7f748d9))
* **core:** resetForm now accepts empty argument, so that it resets form to initialValues. ([cdcbe7c](https://github.com/nkovacic/rc-formly/commit/cdcbe7c))






# [0.6.0](https://github.com/nkovacic/rc-formly/compare/v0.5.2...v0.6.0) (2020-01-13)


### Bug Fixes

* **bootstrap:** errors are now shown only after first blur. ([dc94158](https://github.com/nkovacic/rc-formly/commit/dc94158))


### Features

* **core:** added RcFormlyArrayField to enable better handling of array values in forms. ([a4d74a6](https://github.com/nkovacic/rc-formly/commit/a4d74a6))
* **core:** renamed formikProps to formlyProps on RcFormlyForm render method. ([183f8a5](https://github.com/nkovacic/rc-formly/commit/183f8a5))






## [0.5.2](https://github.com/nkovacic/rc-formly/compare/v0.5.1...v0.5.2) (2019-12-14)


### Bug Fixes

* **modules:** added README.md to core and bootstrap module. ([f42fd3a](https://github.com/nkovacic/rc-formly/commit/f42fd3a))






## [0.5.1](https://github.com/nkovacic/rc-formly/compare/v0.5.0...v0.5.1) (2019-12-14)


### Bug Fixes

* **core:** removed cycle from IRcFormlyFormProps. Prepared eslint for linting. ([ee9dd4d](https://github.com/nkovacic/rc-formly/commit/ee9dd4d))
* **modules:** moved packages from peer dependancies to dependancies ([3d20e4d](https://github.com/nkovacic/rc-formly/commit/3d20e4d))






# [0.5.0](https://github.com/nkovacic/rc-formly/compare/v0.6.0-alpha.12...v0.5.0) (2019-12-08)

**Note:** Version bump only for package @rc-formly/core





# 0.6.0-alpha.12 (2019-12-08)

**Note:** Version bump only for package @rc-formly/core

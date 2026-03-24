export const offsets = {
	// iPhone XS
	// iPhone XS Max
	// iPhone XS Max Global
	// iPhone XR
	"iPhone11": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xe8n,
					ropPid: 0x150n,
					jopPid: 0x158n,
					guardExcCode: 0x308n,
					taskThreads: 0x348n,
					tro: 0x358n,
					ast: 0x37cn,
					mutexData: 0x380n,
					ctid: 0x408n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x918210n,
					guardExcCode: 0x318n,
					taskThreads: 0x358n,
					tro: 0x368n,
					ast: 0x38cn,
					mutexData: 0x398n,
					ctid: 0x418n
				},
				4: {
					kernelTask: 0x91c638n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x320n,
					taskThreads: 0x360n,
					tro: 0x370n,
					ast: 0x394n,
					mutexData: 0x3a0n,
					ctid: 0x420n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x920a90n
				},
				6: {
					kernelTask: 0x9209f0n
				},
				6.1: {
					kernelTask: 0x920a40n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f1548n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x320n,
					taskThreads: 0x370n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				1: {
					kernelTask: 0x9f1560n,
					taskThreads: 0x368n,
					tro: 0x370n,
					ast: 0x394n,
					mutexData: 0x3a0n,
					ctid: 0x420n
				},
				2: {
					kernelTask: 0x9fd988n,
				},
				3: {
					kernelTask: 0x9f5988n
				},
				4: {
					kernelTask: 0xa62b50n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x370n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				5: {
					kernelTask: 0xa6ac38n
				},
				6: {
					kernelTask: 0xa6ad48n,
  					guardExcCode: 0x328n,
					taskThreads: 0x378n,
  					tro: 0x380n,
  					ast: 0x3a4n,
  					mutexData: 0x3b0n,
  					ctid: 0x430n,
  					migLock: 0x36971f0n,
  					migSbxMsg: 0x3697210n,
  					migKernelStackLR: 0x2f7c1a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x8fc638n
				},
				5: {
					kernelTask: 0x900a90n
				},
				6: {
					kernelTask: 0x9009f0n
				},
				6.1: {
					kernelTask: 0x900a40n
				}
			},
			24: {
				0: {
					kernelTask: 0x9d1548n
				},
				1: {
					kernelTask: 0x9d1560n,
				},
				2: {
					kernelTask: 0x9d9988n
				},
				3: {
					kernelTask: 0x9d1988n
				},
				4: {
					kernelTask: 0xa42b50n
				},
				5: {
					kernelTask: 0xad6b78n,
					migLock: 0x38d74e8n,
					migSbxMsg: 0x38d7508n,
					migKernelStackLR: 0x31b19e4n
				},
				6: {
					kernelTask: 0xa4ad48n,
					migLock: 0x352e1f0n,
					migSbxMsg: 0x352e210n,
					migKernelStackLR: 0x2e5ba20n,
				}
			}
		}
	},

	// iPhone 11
	// iPhone 11 Pro
	// iPhone 11 Pro Max
	// iPhone SE 2
	"iPhone12": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x328n,
					taskThreads: 0x368n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x96c178n,
				},
				4: {
					kernelTask: 0x970588n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x9749d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf8n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				1: {
					kernelTask: 0xa494a0n,
					taskThreads: 0x378n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n
				},
				2: {
					kernelTask: 0xa518c8n
				},
				3: {
					kernelTask: 0xa498c8n
				},
				4: {
					kernelTask: 0xacea90n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
  					guardExcCode: 0x338n,
					taskThreads: 0x388n,
  					tro: 0x390n,
  					ast: 0x3b4n,
  					mutexData: 0x3c0n,
  					ctid: 0x440n,
					migLock: 0x38e34e8n,
					migSbxMsg: 0x38e3508n,
					migKernelStackLR: 0x31ba7a0n,
				}
			}
		},
		"3": {
			23: {
				4: {
					kernelTask: 0x974588n
				},
				5: {
					kernelTask: 0x9789d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n
				},
				1: {
					kernelTask: 0xa4d4a0n
				},
				2: {
					kernelTask: 0xa558c8n
				},
				3: {
					kernelTask: 0xa4d8c8n
				},
				4: {
					kernelTask: 0xacea90n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
					migLock: 0x38e7468n,
					migSbxMsg: 0x38e7488n,
					migKernelStackLR: 0x31bf5a0n,
				}
			}
		},
		"5": {
			23: {
				4: {
					kernelTask: 0x974588n
				},
				5: {
					kernelTask: 0x9789d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n
				},
				1: {
					kernelTask: 0xa4d4a0n
				},
				2: {
					kernelTask: 0xa558c8n
				},
				3: {
					kernelTask: 0xa4d8c8n
				},
				4: {
					kernelTask: 0xacea90n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
					migLock: 0x38e7468n,
					migSbxMsg: 0x38e7488n,
					migKernelStackLR: 0x31bf5a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x960588n
				},
				5: {
					kernelTask: 0x9649d8n
				},
				6: {
					kernelTask: 0x964938n
				},
				6.1: {
					kernelTask: 0x964988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa35488n
				},
				1: {
					kernelTask: 0xa354a0n
				},
				2: {
					kernelTask: 0xa3d8c8n
				},
				3: {
					kernelTask: 0xa358c8n
				},
				4: {
					kernelTask: 0xab6a90n
				},
				5: {
					kernelTask: 0xabeb78n
				},
				6: {
					kernelTask: 0xac2c88n,
					migLock: 0x387a8e8n,
					migSbxMsg: 0x387a908n,
					migKernelStackLR: 0x3156f20n,
				}
			}
		}
	},

	// iPhone 12
	// iPhone 12 Mini
	// iPhone 12 Pro
	// iPhone 12 Pro Max
	"iPhone13": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x318n,
					taskThreads: 0x358n,
					tro: 0x368n,
					ast: 0x38cn,
					mutexData: 0x390n,
					ctid: 0x418n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x94c2d0n,
					guardExcCode: 0x328n,
					taskThreads: 0x368n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				4: {
					kernelTask: 0x9546e0n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x954b30n
				},
				6: {
					kernelTask: 0x954a90n
				},
				6.1: {
					kernelTask: 0x954ae0n
				}
			},
			24: {
				0: {
					kernelTask: 0xa295e0n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf8n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				1: {
					kernelTask: 0xa2d5f8n,
					taskThreads: 0x378n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n
				},
				2: {
					kernelTask: 0xa35a20n
				},
				3: {
					kernelTask: 0xa2da20n
				},
				4: {
					kernelTask: 0xa9ebe8n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n,
					migLock: 0x37b8b80n,
					migSbxMsg: 0x37b8ba0n,
					migKernelStackLR: 0x3190fa0n
				},
				5: {
					kernelTask: 0xaa6cd0n,
					migLock: 0x37d4c90n,
					migSbxMsg: 0x37d4cb0n,
					migKernelStackLR: 0x31acce4n
				},
				6: {
					kernelTask: 0xaaade0n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n,
					migLock: 0x37dcc90n,
					migSbxMsg: 0x37dccb0n,
					migKernelStackLR: 0x31b5b60n,
				}
			}
		}
	},

	// iPhone 13
	// iPhone 13 Mini
	// iPhone 13 Pro
	// iPhone 13 Pro Max
	// iPhone SE 3
	// iPhone 14
	// iPhone 14 Plus
	"iPhone14": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0xf0n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x918ee0n,
				},
				4: {
					kernelTask: 0x91d318n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x338n,
					taskThreads: 0x378n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0x925770n
				},
				6: {
					kernelTask: 0x9256d0n
				},
				6.1: {
					kernelTask: 0x925720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f6230n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0xf8n,
					ropPid: 0x168n,
					jopPid: 0x170n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n
				},
				1: {
					kernelTask: 0x9f6248n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				2: {
					kernelTask: 0xa02678n
				},
				3: {
					kernelTask: 0x9fa678n
				},
				4: {
					kernelTask: 0xa67b18n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x448n,
					migLock: 0x382c218n,
					migSbxMsg: 0x382c238n,
					migKernelStackLR: 0x317d020n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x3848428n,
					migSbxMsg: 0x3848448n,
					migKernelStackLR: 0x31994a4n
				},
				6: {
					kernelTask: 0xa73d10n,
					guardExcCode: 0x340n,
					taskThreads: 0x390n,
					tro: 0x398n,
					ast: 0x3bcn,
					mutexData: 0x3c8n,
					ctid: 0x450n,
					migLock: 0x38543a8n,
					migSbxMsg: 0x38543c8n,
					migKernelStackLR: 0x31a27e0n,
				}
			}
		},
		"6": {
			23: {
				4: {
					kernelTask: 0x92d318n
				},
				5: {
					kernelTask: 0x935770n
				},
				6: {
					kernelTask: 0x9316d0n
				},
				6.1: {
					kernelTask: 0x931720n
				}
			},
			24: {
				0: {
					kernelTask: 0xa06230n
				},
				1: {
					kernelTask: 0xa06248n
				},
				2: {
					kernelTask: 0xa12678n
				},
				3: {
					kernelTask: 0xa0a678n
				},
				4: {
					kernelTask: 0xa77b18n,
					migLock: 0x3898c18n,
					migSbxMsg: 0x3898c38n,
					migKernelStackLR: 0x31dff60n
				},
				5: {
					kernelTask: 0xa7fc00n,
					migLock: 0x38b4e28n,
					migSbxMsg: 0x38b4e48n,
					migKernelStackLR: 0x31fc3e4n
				},
				6: {
					kernelTask: 0xa83d10n,
					migLock: 0x38bcda8n,
					migSbxMsg: 0x38bcdc8n,
					migKernelStackLR: 0x3205560n,
				}
			}
		},
		"7": {
			23: {
				4: {
					kernelTask: 0x919318n
				},
				5: {
					kernelTask: 0x921770n
				},
				6: {
					kernelTask: 0x9216d0n
				},
				6.1: {
					kernelTask: 0x921720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f2230n
				},
				1: {
					kernelTask: 0x9f2248n
				},
				2: {
					kernelTask: 0x9fe678n
				},
				3: {
					kernelTask: 0x9f6678n
				},
				4: {
					kernelTask: 0xa67b18n,
					migLock: 0x3813d98n,
					migSbxMsg: 0x3813db8n,
					migKernelStackLR: 0x3163ae0n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x382ffa8n,
					migSbxMsg: 0x382ffc8n,
					migKernelStackLR: 0x317ffa4n
				},
				6: {
					kernelTask: 0xa6fd10n,
					migLock: 0x3833fa8n,
					migSbxMsg: 0x3833fc8n,
					migKernelStackLR: 0x31852a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x919318n
				},
				5: {
					kernelTask: 0x921770n
				},
				6: {
					kernelTask: 0x9216d0n
				},
				6.1: {
					kernelTask: 0x921720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f2230n
				},
				1: {
					kernelTask: 0x9f2248n
				},
				2: {
					kernelTask: 0x9fe678n
				},
				3: {
					kernelTask: 0x9f6678n
				},
				4: {
					kernelTask: 0xa67b18n,
					migLock: 0x3813d98n,
					migSbxMsg: 0x3813db8n,
					migKernelStackLR: 0x3163ae0n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x382ffa8n,
					migSbxMsg: 0x382ffc8n,
					migKernelStackLR: 0x317ffa4n
				},
				6: {
					kernelTask: 0xa6fd10n,
					migLock: 0x3833fa8n,
					migSbxMsg: 0x3833fc8n,
					migKernelStackLR: 0x31852a0n,
				}
			}
		}
	},

	// iPhone 14 Pro
	// iPhone 14 Pro Max
	// iPhone 15
	// iPhone 15 Plus
	"iPhone15": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0xf0n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x914e00n,
				},
				4: {
					kernelTask: 0x919238n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x338n,
					taskThreads: 0x378n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0x921690n
				},
				6: {
					kernelTask: 0x9215f0n
				},
				6.1: {
					kernelTask: 0x921640n
				},
				6.2: {
					kernelTask: 0x91d640n
				}
			},
			24: {
				0: {
					kernelTask: 0x9ee150n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0xf8n,
					ropPid: 0x168n,
					jopPid: 0x170n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n
				},
				1: {
					kernelTask: 0x9f2168n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				2: {
					kernelTask: 0x9fe598n
				},
				3: {
					kernelTask: 0x9f6598n
				},
				4: {
					kernelTask: 0xa67c18n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x448n,
					migLock: 0x37863f8n,
					migSbxMsg: 0x3786418n,
					migKernelStackLR: 0x3131620n
				},
				5: {
					kernelTask: 0xa6fd00n,
					migLock: 0x37a2788n,
					migSbxMsg: 0x37a27a8n,
					migKernelStackLR: 0x314dc24n
				},
				6: {
					kernelTask: 0xa6fe10n,
  					guardExcCode: 0x340n,
					taskThreads: 0x390n,
  					tro: 0x398n,
  					ast: 0x3bcn,
					mutexData: 0x3c8n,
					ctid: 0x450n,
					migLock: 0x37aa708n,
					migSbxMsg: 0x37aa728n,
					migKernelStackLR: 0x3152ee0n
				}
			}
		},
		"4": {
			23: {
				4: {
					kernelTask: 0x941238n
				},
				5: {
					kernelTask: 0x949690n
				},
				6: {
					kernelTask: 0x9495f0n
				},
				6.1: {
					kernelTask: 0x949640n
				}
			},
			24: {
				0: {
					kernelTask: 0xa2a150n
				},
				1: {
					kernelTask: 0xa2a168n
				},
				2: {
					kernelTask: 0xa3a598n
				},
				3: {
					kernelTask: 0xa32598n
				},
				4: {
					kernelTask: 0xaa3c18n,
					migLock: 0x38c5388n,
					migSbxMsg: 0x38c53a8n,
					migKernelStackLR: 0x325f1e0n
				},
				5: {
					kernelTask: 0xaa7d00n,
					migLock: 0x38dd698n,
					migSbxMsg: 0x38dd6b8n,
					migKernelStackLR: 0x32777e4n
				},
				6: {
					kernelTask: 0xaabe10n,
					migLock: 0x38e5618n,
					migSbxMsg: 0x38e5638n,
					migKernelStackLR: 0x3280aa0n,
				}
			}
		},
		"5": {
			23: {
				4: {
					kernelTask: 0x941238n
				},
				5: {
					kernelTask: 0x949690n
				},
				6: {
					kernelTask: 0x9495f0n
				},
				6.1: {
					kernelTask: 0x949640n
				}
			},
			24: {
				0: {
					kernelTask: 0xa2a150n
				},
				1: {
					kernelTask: 0xa2a168n
				},
				2: {
					kernelTask: 0xa3a598n
				},
				3: {
					kernelTask: 0xa32598n
				},
				4: {
					kernelTask: 0xaa3c18n,
					migLock: 0x38c5388n,
					migSbxMsg: 0x38c53a8n,
					migKernelStackLR: 0x325f1e0n
				},
				5: {
					kernelTask: 0xaa7d00n,
					migLock: 0x38dd698n,
					migSbxMsg: 0x38dd6b8n,
					migKernelStackLR: 0x32777e4n
				},
				6: {
					kernelTask: 0xaabe10n,
					migLock: 0x38e5618n,
					migSbxMsg: 0x38e5638n,
					migKernelStackLR: 0x3280aa0n,
				}
			}
		}
	},

	// iPhone 15 Pro
	// iPhone 15 Pro Max
	"iPhone16": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0x140n,
					ropPid: 0x1b0n,
					jopPid: 0x1b8n,
					guardExcCode: 0x380n,
					taskThreads: 0x3c0n,
					tro: 0x3d0n,
					ast: 0x3f4n,
					mutexData: 0x400n,
					ctid: 0x480n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x978ef0n,
				},
				4: {
					kernelTask: 0x991eb0n,
					pComm: 0x56cn,
					troTask: 0x28n,
					options: 0xc0n,
					guardExcCode: 0x388n,
					taskThreads: 0x3c8n,
					tro: 0x3d8n,
					ast: 0x3fcn,
					mutexData: 0x408n,
					ctid: 0x488n
				},
				5: {
					kernelTask: 0x99a308n,
				},
				6: {
					kernelTask: 0x99a268n
				},
				6.1: {
					kernelTask: 0x99a2b8n
				},
				6.2: {
					kernelTask: 0x9962b8n
				}
			},
			24: {
				0: {
					kernelTask: 0xaae870n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x388n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x490n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xaae888n,
					taskThreads: 0x3d0n,
					tro: 0x3d8n,
					ast: 0x3fcn,
					mutexData: 0x408n,
					ctid: 0x488n
				},
				2: {
					kernelTask: 0xab6cb8n
				},
				3: {
					kernelTask: 0xab2cb8n
				},
				4: {
					kernelTask: 0xb23d28n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x498n,
					migLock: 0x3c03ef0n,
					migSbxMsg: 0x3c03f10n,
					migKernelStackLR: 0x3582fe0n
				},
				5: {
					kernelTask: 0xb2be10n,
					migLock: 0x3c181a8n,
					migSbxMsg: 0x3c181c8n,
					migKernelStackLR: 0x35993a4n
				},
				6: {
					kernelTask: 0xb2ff20n,
  					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a0n,
					migLock: 0x3c241a8n,
					migSbxMsg: 0x3c241c8n,
					migKernelStackLR: 0x35a26a0n,
				}
			}
		}
	},
	// iPhone 16
	// iPhone 16 plus
	// iPhone 16 pro
	// iPhone 16 pro max
	"iPhone17": {
		"*": {
			24: {
				0: {
					kernelTask: 0xb7e1c8n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5fcn,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xb7e1e0n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x4a0n,
				},
				2: {
					kernelTask: 0xb86610n
				},
				3: {
					kernelTask: 0xb82610n
				},
				4: {
					kernelTask: 0xc0fd80n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					migLock: 0x4042dc0n,
					migSbxMsg: 0x4042de0n,
					migKernelStackLR: 0x3912aa0n
				},
				5: {
					kernelTask: 0xc17e68n,
					migLock: 0x405eff8n,
					migSbxMsg: 0x405f018n,
					migKernelStackLR: 0x392be64n
				},
				6: {
					kernelTask: 0xc1bf78n,
  					guardExcCode: 0x398n,
					taskThreads: 0x3e8n,
  					tro: 0x3f0n,
					ast: 0x414n,
					mutexData: 0x420n,
					ctid: 0x4b0n,
					migLock: 0x4066f88n,
					migSbxMsg: 0x4066fa8n,
					migKernelStackLR: 0x39352e0n,
				}
			}
		},
		"5": {
			24: {
				0: {
					kernelTask: 0xb7e1c8n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5fcn,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xb7e1e0n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x4a0n,
				},
				2: {
					kernelTask: 0xb86610n
				},
				3: {
					kernelTask: 0xb82610n
				},
				4: {
					kernelTask: 0xc0fd80n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					migLock: 0x408acd0n,
					migSbxMsg: 0x408acf0n,
					migKernelStackLR: 0x396e4a0n
				},
				5: {
					kernelTask: 0xc17e68n,
					migLock: 0x40a6f08n,
					migSbxMsg: 0x40a6f28n,
					migKernelStackLR: 0x3987924n
				},
				6: {
					kernelTask: 0xc1ff78n,
					guardExcCode: 0x398n,
					taskThreads: 0x3e8n,
					tro: 0x3f0n,
					ast: 0x414n,
					mutexData: 0x420n,
					ctid: 0x4b0n,
					migLock: 0x40b6e98n,
					migSbxMsg: 0x40b6eb8n,
					migKernelStackLR: 0x3998de0n,
				}
			}
		}
	}
}
